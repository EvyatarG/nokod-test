<template>
  <div class="start">

    <div class="container">

        <div v-if="ready">
          <p 
            v-for="(user,i) in info"
            :key="i"
          >
              {{user.username}} {{user.type}}
          </p>
        </div>

        <div v-if="!ready">
            <h4>Enter your username</h4>
            <form @submit.prevent="addUser">
                <div class="Enter-username">
                    <input type="text" class="form-control col-9" v-model="username"
                        placeholder="Enter username here">
                    <input type="submit" value="Join" class="btn btn-sm btn-info ml-1">

                </div>
            </form>
        </div>
        <h2 v-else>{{username}}</h2>
        <div v-if="ready">
            <div>
                <h4>My Chat App <span class="float-right">{{connections}} connections</span></h4>
            </div>

            <ul>
                <small v-if="typing" class="text-white">{{typing}} is typing</small>
                <li 
                  v-for="(message,i) in messages"
                  :key="i"
                >
                    <span :class="{'float-left':message.type === 1}">
                        {{message.message}}
                        <small>:{{message.user}}</small>
                    </span>
                </li>
            </ul>

            <div>
              <form @submit.prevent="send">
                <div>
                  <input type="text" class="text-input" v-model="newMessage"
                      placeholder="Enter message here"
                  >
                </div>
              </form>
            </div>

        </div>
    </div>


  </div>
</template>

<script>
import { socket } from 'socket.io-client';

export default {
  name: 'StartPage',
  props: {
    msg: String
  },
  data: () => ({
    newMessage: null,
    messages: [],
    typing: false,
    username: null,
    ready: false,
    info: [],
    connections: 0,
  }),

  created() {
    window.onbeforeunload = () => {
        socket.emit('leave', this.username);
    }
    
    socket.on('chat-message', (data) => {
        this.messages.push({
            message: data.message,
            type: 1,
            user: data.user,
        });
    });

    socket.on('typing', (data) => {
        this.typing = data;
    });


    socket.on('stopTyping', () => {
        this.typing = false;
    });

    socket.on('joined', (data) => {
        this.info.push({
            username: data,
            type: 'joined'
        });

        setTimeout(() => {
            this.info = [];
        }, 5000);
    });

    socket.on('leave', (data) => {
        this.info.push({
            username: data,
            type: 'left'
        });

        setTimeout(() => {
            this.info = [];
        }, 5000);
    });

    socket.on('connections', (data) => {
        this.connections = data;
    });
},
      
  watch: {
    newMessage(value) {
      value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
    }
  },

  methods: {
    send() {
      this.messages.push({
          message: this.newMessage,
          type: 0,
          user: 'Me',
      });

      socket.emit('chat-message', {
          message: this.newMessage,
          user: this.username
      });
      this.newMessage = null;
  },

  addUser() {
      this.ready = true;
      socket.emit('joined', this.username)
  }
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
