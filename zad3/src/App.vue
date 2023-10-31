<template>
  <div id="app">
    <b-container>
      <h1>Baza filmów</h1>
      <SearchBar/>
    </b-container>
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'
import SearchBar from "./components/SearchBar.vue";

export default {
  name: 'App',
  components: {
    SearchBar
  }
}
</script>

<style>

#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #212529;
  text-align: left;
}
</style>
