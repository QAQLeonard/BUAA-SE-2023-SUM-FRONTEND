<template lang="">
  <div>
    <div class="message-wrapper">
      <div class="group-list">
        <ul>
          <li v-for="item in groupList"
          :key="item.group_id"
          >
            <div class="group-item" @click="selectGroup(item)">{{ item.group_name }}</div>
          </li>
        </ul>
      </div>
      <div class="message-box">
        <div class="message-list">
          <ul>
            <li v-for="item in msgList"
            :class="{ 'my-message' : item.sender_uname === username }"
            :key="item.message_id"
            >
              <div class="user-item">
                {{ item.sender_uname }} : <br>
              </div>
              <div class="message-item">
                  {{ item.content }}
              </div>
            </li>
          </ul>
        </div>
        <div class="text-box">
          <textarea name="text" id="" cols="30" v-model='msg'></textarea>
          <div class="send-btn">
            <i class="el-icon-position" @click="sendMessage"></i>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
const ws = new WebSocket("ws://localhost:8000");
// const ws = new WebSocket("ws://23.94.102.135:8001/chat");

import { getGroupByID, getGroupByUser } from "../api/api.js";

export default {
  data() {
    return {
      uid: "1",
      username: localStorage.getItem("username"),
      groupList: [
        {
          group_id: "testTeamID",
          group_name: "testTeamName\u9ed8\u8ba4\u7fa4\u804a",
          group_type: "Public",
          team_id: "testTeamID",
        },
        {
          group_id: "123",
          group_name: "234\u9ed8\u8ba4\u7fa4\u804a",
          group_type: "Public",
          team_id: "123",
        },
      ],
      selectedGroup: {},
      msg: "",
      msgList: [
        {
          "content": "Hello, this is a test message.",
          "sender_uname": localStorage.getItem("username"),
          "group_id": "testTeamID"
        },
        {
          "content": "黄昏的景色在镜后移动着。也就是说，镜面映现的虚像与镜后的实物在晃动，好像电影里的叠影一样。出场人物和背景没有任何联系。而且人物是一种透明的幻象，景物则是在夜霭中的朦胧暗流，两者消融在一起，描绘出一个超脱人世的象征世界。特别是当山野里的灯火映照在姑娘的脸上时，那种无法形容的美，使岛村的心都几乎为之颤动。",
          "sender_uname": "kaikai",
          "group_id": "testTeamID"
        },
        {
          "content": "我抄，原",
          "sender_uname": "zxd",
          "group_id": "testTeamID"
        },
      ],
    };
  },
  methods: {
    getGroupList(username) {
      getGroupByUser(username).then((res) => {
        console.log(res);
        this.groupList = res.data.data;
      });
    },
    selectGroup(group) {
      this.selectedGroup = group;
      getMessageList(group.group_id).then((res) => {
        this.msgList = res.data.data;
      });
    },
    sendMessage() {
      const msg = this.msg.trim();
      if (!msg) return;
      ws.send(
        JSON.stringify({
          content: this.msg,
          sender_uname: this.username,
          group_id: 1,
        })
      );
      this.msg = "";
    },
    handleWsOpen(e) {
      console.log("FE: WebSocket open", e);
    },
    handleWsClose(e) {
      console.log("FE: WebSocket Close", e);
    },
    handleWsError(e) {
      console.log("FE: WebSocket error", e);
    },
    handleWsMessage(e) {
      // console.log('FE: WebSocket message', e);
      const msg = JSON.parse(e.data);
      this.msgList.push(msg);
    },
  },
  created() {
    // this.username = window.localStorage.getItem("username");
    // this.getGroupList(this.username)
  },
  mounted() {
    ws.addEventListener("open", this.handleWsOpen.bind(this), false);
    ws.addEventListener("close", this.handleWsClose.bind(this), false);
    ws.addEventListener("error", this.handleWsError.bind(this), false);
    ws.addEventListener("message", this.handleWsMessage.bind(this), false);
  },
};
</script>

<style lang="css">
@import "../assets/css/message.css";
</style>