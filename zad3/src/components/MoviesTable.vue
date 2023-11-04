<script setup>
import {useMoviesStore} from "@/stores/MoviesStore";
import {ref} from 'vue';
import {slice} from 'lodash'

const movies = useMoviesStore();
let moviesList = ref(slice(movies.getMovies,0, 10));
let moviesAmount = 10;

movies.$subscribe(()=>{
  moviesAmount = 10;
  moviesList.value = slice(movies.getMovies,0, 10);
})

function expandList(){
  moviesAmount+=10;
  moviesList.value=slice(movies.getMovies,0, moviesAmount);
}
</script>

<template>
  <div>
    <b-table small hover :items="moviesList" :fields="fields">
      <template #cell(title)="movie">
        {{ movie.item.title }}
      </template>
      <template #cell(year)="movie">
        {{ movie.item.year }}
      </template>
      <template #cell(cast)="movie">
        <li v-for="person in movie.item.cast" :key="person">{{ person }}</li>
      </template>
      <template #cell(genres)="movie">
        <span v-for="genre in movie.item.genres" :key="genre">{{ genre }} </span>
      </template>
    </b-table>
    <b-button @click="expandList()" block variant="info">Pokaż więcej</b-button>
  </div>
</template>

<script>
export default {
  name: 'MoviesTable',
  data() {
    return {
      // fields: ['title', 'year', 'cast', 'genres']
      fields:[
        {key:'title', label:'Title', tdClass:"maxWidthTitle"},
        'year',
        {key:'cast', label:'Cast', tdClass:"maxWidthCast"},
        {key:'genres', label:'Genres', tdClass:"maxWidthGenres"},
      ]
    }
  }
}
</script>

<style scoped>
/deep/ .maxWidthTitle{
  max-width: 15vw;
}
</style>

