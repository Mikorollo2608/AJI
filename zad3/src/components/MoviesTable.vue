<script setup>
import {useMoviesStore} from "@/stores/MoviesStore";
const movies = useMoviesStore();
let moviesList = movies.getMovies.slice(0,10);
console.log(movies.getMovies);
</script>

<template>
  <b-table hover :items="moviesList" :fields="fields">
    <template #cell(title)="movie">
    {{movie.item.title}}
  </template>
    <template #cell(year)="movie">
    {{ movie.item.year }}
  </template>
    <template #cell(cast)="movie">
    {{ movie.item.cast }}
  </template>
    <template #cell(genres)="movie">
    {{ movie.item.genres }}
  </template>
  </b-table>
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
      fields: ['title', 'year', 'cast', 'genres']
    }
  }
}
</script>

<style scoped>

</style>