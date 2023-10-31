<template>
    <b-form>
      <b-form-group label="Tytuł" label-for="inputTitle">
        <b-form-input type="text" id=inputTitle class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu"/>
      </b-form-group>
      <b-form-group label="Rok produkcji od:" label-for="inputProductionFrom" label-cols-sm="4">
          <b-form-input type="text" id=inputProductionFrom class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"/>
      </b-form-group>
      <b-form-group label="Rok produkcji do:" label-for="inputProductionTo" label-cols-sm="4">
          <b-form-input type="text" id=inputProductionTo class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019"/>
      </b-form-group>
      <b-form-group label="Obsada" label-for="inputCast">
        <b-form-input type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
      </b-form-group>
      <b-button block type="submit" variant="info">Szukaj</b-button>
    </b-form>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style scoped>
</style>