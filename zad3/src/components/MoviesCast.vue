<script setup>
import {useMoviesStore} from "@/stores/MoviesStore";
import {filter, flatten, includes, map, slice, uniq} from "lodash";

const movies = useMoviesStore();
let moviesListCast = slice(filter(movies.getMovies,(movie) => {
  return  movie.cast.length !== 0;
}), 0, 100);

let actors = uniq(flatten(map(moviesListCast,'cast')));
</script>

<template>
  <div>
    <b-list-group v-for="actor in actors" :key="actor">
      <div>
        <h4 class="pt-3">{{actor}}</h4>
        <b-list-group-item v-for="movie in filter(moviesListCast, (m) => { return includes(m.cast, actor) })" :key="movie">
          {{movie.title}} - {{movie.year}}
        </b-list-group-item>
      </div>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'MoviesCast'
}
</script>

<style scoped>
</style>