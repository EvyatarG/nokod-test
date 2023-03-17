<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <StartPage msg="Nokod Chat"/>
  </div>
</template>

<script>
import StartPage from './components/StartPage.vue'
import SocketService from '../services/socket.service';

export default {
  name: 'App',
  components: {
    StartPage,
  },
  created() {
    SocketService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketService.disconnect();
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
