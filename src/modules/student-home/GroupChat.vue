<template>
 <v-card flat>
    <v-toolbar
      color="primary"
      dark
      extended
      flat
    >
    </v-toolbar>
    <v-card
      style="margin-top: -64px; margin-left: 20px; margin-right: 20px"
    >
      <v-toolbar flat>
        <v-toolbar-title>
                        <span class="font-weight-medium">{{tutorialGroup.tutorialGroupNumber}}</span> - {{ tutorialGroup.section ? tutorialGroup.section.course 
              ? (tutorialGroup.section.course.courseNumber + ' - '+ tutorialGroup.section.course.courseName) : '' : '' }}
              
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-row v-if="isTutor">
      </v-row>

      <v-btn outlined color="error" v-if="connected" @click="disconnect">Leave</v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout row>
          <v-flex xs12 lg8 pl-2>
            <v-card>
              <v-tabs
                v-model="tab"
                color="primary"
              >
                <v-tab
                class="pt-2"
                >  
                  Live Code Share
                </v-tab>
              <v-tab
              @click="getUsers"
              class="pt-2 pr-5"
                >
                  <v-badge
                    color="green"
                    :content="users.length"
                    bordered
                  >
                    Participants
                  </v-badge>
                  
                </v-tab>
              <v-layout>
                    <v-tooltip bottom v-if="!isTutor && tab==0">
      <template v-slot:activator="{ on, attrs }">
              <i  v-on="on" v-bind="attrs" :class="[currentLanugageClass + ' colored mt-2 ml-1']" style="font-size: 2.5em;"></i>

      </template>
      <span>Currently selected language</span>
    </v-tooltip>
                  <v-row v-if="isTutor && tab==0">
              <v-col  class="pt-1 ml-2" >
                <v-select
                :items="languages"
                label="Language"
                item-text="text"
                item-value="value"
                outlined
                dense
                :value="cmOptions.mode"
                @input="onLanguageChange"
                class="pr-5 pb-2"
                style="width: 200px"
              ></v-select>
              </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  
                  <v-switch v-if="tab==0" class="mr-4 mt-2" :input-value="isDark" @change="onThemeChange" inset label="Dark theme"></v-switch>

                </v-layout>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                >
                  <codemirror ref="myCm"
                    :value="code" 
                    :options="cmOptions"
                    @input="onCmCodeChange" :style="cssVars">
                  </codemirror>
                </v-tab-item>
                      <v-tab-item
                >
                  <v-card flat>
                    <v-card-text>
                      <v-divider />
                      <v-list>
                            <v-list-item
                                v-for="item in users"
                                :key="item.id"
                              >
                                <v-list-item-avatar>
                                  <v-img src="@/assets/avatar_anonymous.png"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ item.firstName }} {{ item.middleName }} {{ item.lastName }}
                                    <span v-if="item.username == tutorialGroup.tutor.username">(Tutor)</span>
                                  </v-list-item-title>
                                  <v-list-item-subtitle>{{ item.username }}</v-list-item-subtitle>

                                </v-list-item-content>

                                <v-list-item-icon>
                                  <v-icon color="green">mdi-record</v-icon>
                                </v-list-item-icon>
                              </v-list-item>
                            </v-list>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-flex>
        <v-flex xs12 lg4>
    <v-timeline dense clipped >
      <v-timeline-item
        fill-dot
        class="white--text"
        color="primary"
        large
      >
        <template v-slot:icon>
        </template>
        <v-text-field
          v-model="input"
          hide-details
          flat
          :label="connected ? 'Leave a comment...' : 'Trying to connect'"
          outlined
          :disabled="!connected"
          @keydown.enter="send"
          class="mr-2 pb-0"
        >
          <template v-slot:append v-if="connected">
            <v-btn
              class="mb-5"
              @click="send"
              outlined
            >
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>

      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="message in received_messages"
          :key="message.id"
          class="pb-0 mr-4"
          :color="message.type == 'JOIN' ? 'green' : message.type == 'LEAVE' ? 'red' : 'primary'"
          small
          right
        >
      <template v-slot:opposite v-if="message.type == 'CHAT'">
      </template>
          <v-row justify="space-between">
            <v-col cols="7" >
              <span v-if="message.type == 'JOIN'">{{message.sender == user.email ? "You" : message.sender}} joined</span>
              <span v-if="message.type == 'LEAVE'">{{message.sender == user.email ? "You" : message.sender}} left</span>
              <span v-if="message.type == 'CHAT'">
                <div>
        <strong>{{message.sender == user.email ? "You" : message.sender}}</strong>

                </div>
                 {{message.content}}
                 </span>
            </v-col>
            <v-col class="text-right" cols="5" >
              <span v-if="API_ROOT.includes('localhost')">{{message.createdOn | moment("from", "now")}}</span>
              <span v-else>{{ $moment.utc(message.createdOn).local().fromNow()}}</span>
              </v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
    </v-flex>
  </v-layout>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

import 'codemirror/mode/css/css.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/python/python.js'

// theme css
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'

import AccountService from "@/services";
import { PostAPI } from "@/api";
const API_ROOT = process.env.VUE_APP_API_ROOT;

export default {
  name: "groupchat",
  props: ['enrollment'],
  data() {
    return {
      API_ROOT: API_ROOT,
      received_messages: [],
      connected: false,
      user: AccountService.getProfile(),
      input: null,
      tutorialGroupId: 0,
      tutorialGroup:{},
      code: '',
      isTutor: false,
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-light',
        lineNumbers: true,
        line: true,
        readOnly: true,
      },
      languages: [
        { text: "CSS", value: "text/css"},
        { text: "Java", value: "text/x-java"},
        { text: "Html", value: "text/html"},
        { text: "Javascript", value: "text/javascript"},
        { text: "PHP", value: "text/x-php"},
        { text: "Python", value: "text/x-python"}
      ],
      themes: [
        { text: "Dark", value: "base16-dark"},
        { text: "Light", value: "base16-light"}], 
      users: [],
      tab: null,
      currentLanugage: "Javascript",
      currentLanugageClass: "devicon-javascript-plain",
      isDark: false,
      subscriptions:[]
    };
  },
  computed: {
      timeline () {
        return this.received_messages.slice().reverse()
      },
      cssVars () {
        return{
          '--visibility': this.isTutor ? '' :'hidden',
        }
      }
    },
  async created() {
    this.tutorialGroup = this.enrollment.tutorialGroup;
    this.isTutor = this.enrollment.role == "TUTOR";
    PostAPI.getByTutorialGroup(this.enrollment.tutorialGroup).then(history => {
      this.received_messages = history.reverse()
    })
  },
  methods: {
    stream() {
      if (this.stompClient && this.stompClient.connected && this.code != null && this.isTutor) {
        const msg = { sender: this.user.email, content: this.code,
            type: 'CHAT', tutorialGroup: this.tutorialGroup };
        this.stompClient.send("/app/chat.stream/"+this.tutorialGroupId, JSON.stringify(msg), {});
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected && this.input != "" && this.input != null) {
        const msg = { sender: this.user.email, content: this.input,
            type: 'CHAT', tutorialGroup: this.tutorialGroup };
        this.stompClient.send("/app/chat.send/"+this.tutorialGroupId, JSON.stringify(msg), {});
        this.input = null
      }
    },
    updateLanguage() {
      
      if (this.stompClient && this.stompClient.connected && this.isTutor) {
        const msg = { sender: this.user.email, content: this.cmOptions.mode,
            type: 'LANGUAGE', tutorialGroup: this.tutorialGroup };
        this.stompClient.send("/app/chat.language/"+this.tutorialGroupId, JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS(API_ROOT+"/tutorial");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.debug = () => {};
      this.stompClient.connect(
        { username: this.user.email},
        () => {
          this.connected = true;
          var messageSub = this.stompClient.subscribe("/group/"+this.tutorialGroupId, tick => {
            if(JSON.parse(tick.body).type == "JOIN"){              
              this.getUsers()
              this.stream()
              this.updateLanguage()
            }
            else if(JSON.parse(tick.body).type == "LEAVE"){
              this.getUsers()
            } 
            else {
              this.received_messages.unshift(JSON.parse(tick.body));
            }
          });
          this.subscriptions.push(messageSub);

          var codeSub = this.stompClient.subscribe("/group/"+this.tutorialGroupId+"/code", tick => {
            if(!this.isTutor){
              this.code = JSON.parse(tick.body).content;
            }
          });
          this.subscriptions.push(codeSub);

          var lanSub = this.stompClient.subscribe("/group/"+this.tutorialGroupId+"/language", tick => {
            if(!this.isTutor){
              this.cmOptions.mode = JSON.parse(tick.body).content;
              this.currentLanugage = this.languages.filter( lan => lan.value == this.cmOptions.mode)[0].text;
              this.currentLanugageClass = this.getLanguageClass(this.currentLanugage);
            }
          });
          this.subscriptions.push(lanSub);

          const msg = { sender: this.user.email, content: "",
            type: 'JOIN', tutorialGroup: this.tutorialGroup };
          this.stompClient.send("/app/chat.register/"+this.tutorialGroupId, JSON.stringify(msg), {});
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {

        const msg = { sender: this.user.email, content: "",
            type: 'LEAVE', tutorialGroup: this.tutorialGroup};
        this.stompClient.send("/app/chat.register/"+this.tutorialGroupId, JSON.stringify(msg), {});
        this.subscriptions.forEach(subscription => {
          subscription.unsubscribe()
        });            

        this.stompClient.disconnect();
        this.socket.close();

        this.$router.push({ name: "group-list" }).catch(() => {});
      }
      this.connected = false;
    },
    onCmCodeChange(newCode) {
      this.code = newCode
      this.stream()
    },
    onLanguageChange(language) {
      this.cmOptions.mode = language
      this.updateLanguage(this.cmOptions.mode)
    },
    onThemeChange(isDark) {
      this.cmOptions.theme = isDark ? "base16-dark" : "base16-light";
    },
    getUsers(){
      PostAPI.getCurrentUsers(this.tutorialGroupId).then(currentUsers => {
      this.users = currentUsers;
      }) 
    },
    getLanguageClass(languageClass){
      switch (languageClass) {
        case 'Html':
          return "devicon-html5-plain-wordmark"
        case 'CSS':
          return "devicon-css3-plain-wordmark"
        case 'Java':
          return "devicon-java-plain-wordmark"
        case 'PHP':
          return "devicon-php-plain"
        case 'Python':
          return "devicon-python-plain-wordmark"
        default:
          return "devicon-javascript-plain"
      }
    }
  },
  mounted() {
    this.connect();
    this.cmOptions.readOnly = !this.isTutor;
    this.getUsers();
  },
  beforeDestroy(){
    this.disconnect();
  },
  destroyed(){
    this.disconnect();
  }
};
</script>
<style>
  .CodeMirror {
    height: auto !important;
    min-height: 500px !important;
    padding: 6px 12px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .CodeMirror-scroll{
    height: auto !important;
    min-height: 500px !important;
  }
  .CodeMirror-cursor, div.CodeMirror-cursor{
    visibility: var(--visibility) !important
  }
</style>