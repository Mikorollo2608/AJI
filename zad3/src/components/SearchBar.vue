<script setup>
  import {ref} from 'vue';
  import {useMoviesStore} from "@/stores/MoviesStore";
  import {split} from 'lodash'
  const movies = useMoviesStore();
  const title = ref('');
  const yearStart = ref('');
  const yearEnd = ref('');
  const cast = ref('');

  function setFilters(){
    let titleCopy=title.value;
    let yearStartCopy=yearStart.value;
    let yearEndCopy=yearEnd.value;
    let castCopy=cast.value===""?null:split(cast.value,',');
    movies.$patch({
      title: titleCopy,
      yearStart: yearStartCopy,
      yearEnd: yearEndCopy,
      cast: castCopy
    })
  }
</script>

<template>
    <b-form>
      <b-form-group label="Tytuł" label-for="inputTitle">
        <b-form-input v-model="title" type="text" id=inputTitle class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
      </b-form-group>
      <b-form-group label="Rok produkcji od:" label-for="inputProductionFrom" label-cols-sm="4">
          <b-form-input v-model="yearStart" type="text" id=inputProductionFrom class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"/>
      </b-form-group>
      <b-form-group label="Rok produkcji do:" label-for="inputProductionTo" label-cols-sm="4">
          <b-form-input v-model="yearEnd" type="text" id=inputProductionTo class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019"/>
      </b-form-group>
      <b-form-group label="Obsada" label-for="inputCast">
        <b-form-input v-model="cast" type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
      </b-form-group>
      <b-button @click="setFilters()" block variant="info">Szukaj</b-button>
    </b-form>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style scoped>
</style>