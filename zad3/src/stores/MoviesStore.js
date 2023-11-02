import { defineStore } from "pinia";
import data from './../data/movies.json';
export const useMoviesStore = defineStore('movies', {
    state: () => {
        return {
            movies: data
        }
    },
    getters: {
        getMovies() {
            return JSON.parse(JSON.stringify(this.movies));
        },
    },
    actions: {
    }
})