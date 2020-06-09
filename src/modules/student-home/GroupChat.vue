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
        <v-toolbar-title>{{tutorialGroupDetail.tutorialGroupNumber}}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-row>
        <v-col md="4"
        offset-md="8">
          <v-select
          :items="languages"
          label="Languages"
          item-text="text"
          item-value="value"
          outlined
          dense
          :value="cmOptions.mode"
          @input="onLanguageChange"
          class="mr-2 mt-7"
        ></v-select>
        </v-col>
      </v-row>

      <v-btn outlined color="error" v-if="connected" @click="disconnect">Leave</v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout row>
          <v-flex xs7 pl-2>
            <v-card>
              <v-tabs
                v-model="tab"
                color="primary"
              >
                <v-tab
                >  
                  Live Code Share
                </v-tab>
              <v-tab
              @click="getUsers"
                >
                  
                  Participants
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                >
                  <codemirror ref="myCm"
                    :value="code" 
                    :options="cmOptions"
                    @input="onCmCodeChange">
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
                                  </v-list-item-title>
                                  <v-list-item-subtitle>{{ item.username }}</v-list-item-subtitle>

                                </v-list-item-content>

                                <v-list-item-icon>
                                  <v-icon color="green">fiber_manual_record</v-icon>
                                </v-list-item-icon>
                              </v-list-item>
                            </v-list>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-flex>
        <v-flex xs5>
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
          :color="message.type == 'JOIN' ? 'green' : message.type == 'LEAVE' ? 'red' : 'grey'"
          small
          right
        >
      <template v-slot:opposite v-if="message.type == 'CHAT'">
      </template>
          <v-row justify="space-between">
            <v-col cols="7" >
              <span v-if="message.type == 'JOIN'">{{message.sender == user.name ? "You" : message.sender}} joined</span>
              <span v-if="message.type == 'LEAVE'">{{message.sender == user.name ? "You" : message.sender}} left</span>
              <span v-if="message.type == 'CHAT'">
                <div>
        <strong>{{message.sender == user.name ? "You" : message.sender}}</strong>

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

import AccountService from "@/services";
import { TutorialGroupAPI, PostAPI } from "@/api";
const API_ROOT = process.env.VUE_APP_API_ROOT;

export default {
  name: "groupchat",
  data() {
    return {
      API_ROOT: API_ROOT,
      received_messages: [],
      connected: false,
      user: AccountService.getProfile(),
      input: null,
      tutorialGroupId: 0,
      tutorialGroupDetail:{},
      code: 'const a = 10',
      isTutor: false,
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
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
      users: [],
      tab: null
    };
  },
  computed: {
      timeline () {
        return this.received_messages.slice().reverse()
      },
    },
  async created() {
    const { tutorialGroupId } = this.$route.params;
    this.tutorialGroupId = tutorialGroupId;
    TutorialGroupAPI.get(tutorialGroupId).then(res => {
      this.tutorialGroupDetail = res;
      PostAPI.getByTutorialGroup(this.tutorialGroupDetail).then(history => {
      this.received_messages = history.reverse()
    })   
    })
  },
  methods: {
    stream() {
      if (this.stompClient && this.stompClient.connected && this.code != "" && this.code != null && this.isTutor) {
        const msg = { sender: this.user.name, content: this.code,
            type: 'CHAT', tutorialGroup: this.tutorialGroupDetail };
        this.stompClient.send("/app/chat.stream/"+this.tutorialGroupId, JSON.stringify(msg), {});
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected && this.input != "" && this.input != null) {
        const msg = { sender: this.user.name, content: this.input,
            type: 'CHAT', tutorialGroup: this.tutorialGroupDetail };
        this.stompClient.send("/app/chat.send/"+this.tutorialGroupId, JSON.stringify(msg), {});
        this.input = null
      }
    },
    updateLanguage() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { sender: this.user.name, content: this.cmOptions.mode,
            type: 'LANGUAGE', tutorialGroup: this.tutorialGroupDetail };
        this.stompClient.send("/app/chat.language/"+this.tutorialGroupId, JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS(API_ROOT+"/tutorial");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.debug = () => {};
      this.stompClient.connect(
        { username: this.user.name},
        () => {
          this.connected = true;
          this.stompClient.subscribe("/group/"+this.tutorialGroupId, tick => {
            this.received_messages.unshift(JSON.parse(tick.body));
          });

          this.stompClient.subscribe("/group/"+this.tutorialGroupId+"/code", tick => {
            if(!this.isTutor){
              this.code = JSON.parse(tick.body).content;
            }
          });

          this.stompClient.subscribe("/group/"+this.tutorialGroupId+"/language", tick => {
            if(!this.isTutor){
              this.cmOptions.mode = JSON.parse(tick.body).content;
            }
          });

          const msg = { sender: this.user.name, content: "",
            type: 'JOIN', tutorialGroup: this.tutorialGroupDetail };
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
                  const msg = { sender: this.user.name, content: "",
            type: 'LEAVE', tutorialGroup: this.tutorialGroupDetail};
        this.stompClient.send("/app/chat.register/"+this.tutorialGroupId, JSON.stringify(msg), {});
        this.stompClient.disconnect();
        this.$router.push({ name: "group-list" });
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
    onCmCodeChange(newCode) {
      this.code = newCode
      this.stream()
    },
    onLanguageChange(language) {
      this.cmOptions.mode = language
      this.updateLanguage()
    },
    getUsers(){
      PostAPI.getCurrentUsers(this.tutorialGroupDetail).then(currentUsers => {
      this.users = currentUsers;
    }) 
    }
  },
  mounted() {
    this.connect();
    this.isTutor = AccountService.getProfile().name == "tutor@miu.edu";
    this.cmOptions.readOnly = !this.isTutor;
    this.getUsers();
  },
  beforeDestroy(){
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
</style>