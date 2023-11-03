<script setup>
import {useMoviesStore} from "@/stores/MoviesStore";
import {ref} from 'vue';

const movies = useMoviesStore();
let moviesList = ref(movies.getMovies.slice(0, 10));
let moviesAmount = 10;
console.log(moviesAmount)
function updateList(){
  moviesAmount+=10;
  moviesList.value=movies.getMovies.slice(0, moviesAmount);
  console.log(JSON.stringify(moviesList));
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
    <b-button @click="updateList()" block variant="info">Pokaż więcej</b-button>
  </div>
  <!--  <b-table hover>-->
  <!--    <b-thead>-->
  <!--      <b-tr>-->
  <!--        <b-th>Title</b-th>-->
  <!--        <b-th>Production year</b-th>-->
  <!--        <b-th>Cast</b-th>-->
  <!--        <b-th>Genres</b-th>-->
  <!--      </b-tr>-->
  <!--    </b-thead>-->
  <!--    <b-tbody>-->
  <!--&lt;!&ndash;      <b-tr v-for="movie in moviesList" v-bind:key="movie.title">&ndash;&gt;-->
  <!--&lt;!&ndash;        <b-td>{{movie.title}}</b-td>&ndash;&gt;-->
  <!--&lt;!&ndash;        <b-td>{{movie.year}}</b-td>&ndash;&gt;-->
  <!--&lt;!&ndash;        <b-td>{{movie.cast}}</b-td>&ndash;&gt;-->
  <!--&lt;!&ndash;        <b-td>{{movie.genres}}</b-td>&ndash;&gt;-->
  <!--&lt;!&ndash;      </b-tr>&ndash;&gt;-->
  <!--            <b-tr>-->
  <!--              <b-td>piwo</b-td>-->
  <!--              <b-td>piwo2</b-td>-->
  <!--              <b-td>piwo3</b-td>-->
  <!--              <b-td>piwo4</b-td>-->
  <!--            </b-tr>-->
  <!--    </b-tbody>-->
  <!--  </b-table>-->
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

