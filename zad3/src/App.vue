<template>
  <div id="app">
    <b-container>
      <h1>Baza filmów</h1>
      <SearchBar/>
      <MoviesTable/>
    </b-container>
  </div>
</template>
<script>
import SearchBar from "./components/SearchBar.vue";
import MoviesTable from "@/components/MoviesTable.vue";
export default {

  name: 'App',
  components: {
    MoviesTable,
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
