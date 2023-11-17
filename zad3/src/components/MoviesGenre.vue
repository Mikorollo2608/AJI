<script setup>
import {useMoviesStore} from "@/stores/MoviesStore";
import {slice, filter, map, flatten, uniq, includes,sortBy} from "lodash";

const movies = useMoviesStore();
let moviesListGenres = slice(filter(movies.getMovies,(movie) => {
 return  movie.genres.length !== 0;
}), 0, 100);

let genres = sortBy(uniq(flatten(map(moviesListGenres,'genres'))));
</script>

<template>
  <div>
    <b-list-group v-for="genre in genres" :key="genre">
      <div>
        <h4 class="pt-3">{{genre}}</h4>
        <b-list-group-item v-for="movie in filter(moviesListGenres, (m) => { return includes(m.genres, genre) })" :key="movie">
          {{movie.title}} - {{movie.year}}
        </b-list-group-item>
      </div>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'MoviesGenre'
}
</script>

<style scoped>

</style>