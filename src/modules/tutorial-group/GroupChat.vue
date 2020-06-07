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
      style="margin-top: -64px; margin-left: 200px; margin-right: 200px"
    >
      <v-toolbar flat>
        <v-toolbar-title>{{tutorialGroupDetail.tutorialGroupNumber}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn outlined color="error" v-if="connected" @click="disconnect">Leave</v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
    <v-timeline clipped style="margin-left: -700px;">
      <v-timeline-item
        fill-dot
        class="white--text mb-12"
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
          solo
          :disabled="!connected"
          @keydown.enter="send"
        >
          <template v-slot:append v-if="connected">
            <v-btn
              class="mx-0"
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
          class="mb-4"
          :color="message.type == 'JOIN' ? 'green' : message.type == 'LEAVE' ? 'red' : 'grey'"
          small
          right
        >
      <template v-slot:opposite v-if="message.type == 'CHAT'">
        <strong>{{message.sender == user.name ? "You" : message.sender}}</strong>
      </template>
          <v-row justify="space-between">
            <v-col cols="7" >
              <span v-if="message.type == 'JOIN'">{{message.sender == user.name ? "You" : message.sender}} joined</span>
              <span v-if="message.type == 'LEAVE'">{{message.sender == user.name ? "You" : message.sender}} left</span>
              <span v-if="message.type == 'CHAT'"> {{message.content}}</span>
            </v-col>
            <v-col class="text-right" cols="5" >{{message.createdOn | moment("from", "now")}}</v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import AccountService from "@/services";
import { TutorialGroupAPI, PostAPI } from "@/api";

export default {
  name: "groupchat",
  data() {
    return {
      received_messages: [],
      connected: false,
      user: AccountService.getProfile(),
      input: null,
      tutorialGroupId: 0,
      tutorialGroupDetail:{}
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
    send() {
      if (this.stompClient && this.stompClient.connected && this.input != "" && this.input != null) {
        const msg = { sender: this.user.name, content: this.input,
            type: 'CHAT', tutorialGroup: this.tutorialGroupDetail };
        this.stompClient.send("/app/chat.send/"+this.tutorialGroupId, JSON.stringify(msg), {});
        this.input = null
      }
    },
    connect() {
      this.socket = new SockJS("http://localhost:8080/tutorial");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe("/group/"+this.tutorialGroupId, tick => {
            this.received_messages.unshift(JSON.parse(tick.body));
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
        this.$router.push({ name: "tutorial-group-list" });
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  },
  mounted() {
    this.connect();
  },
  beforeDestroy(){
    this.disconnect();
  }
};
</script>