<template>
  <div id="app">
    <b-container>
      <h1>Baza filmów</h1>
      <SearchBar/>
      <MoviesTable/>
      <h1>Filmy wg gatunku</h1>
      <MoviesGenre/>
      <h1 class="pt-5">Filmy wg obsady</h1>
      <MoviesCast/>
    </b-container>
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar.vue";
import MoviesTable from "@/components/MoviesTable.vue";
import MoviesGenre from "@/components/MoviesGenre.vue";
import MoviesCast from "@/components/MoviesCast.vue";
export default {

  name: 'App',
  components: {
    MoviesCast,
    MoviesGenre,
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
