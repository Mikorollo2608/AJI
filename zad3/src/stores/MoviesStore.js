import { defineStore } from "pinia";
import {filter, intersection, includes} from "lodash";
import data from './../data/movies.json';
export const useMoviesStore = defineStore('movies', {
    state: () => {
        return {
            movies: data,
            title: "",
            yearStart: "",
            yearEnd: "",
            cast: null
        }
    },
    getters: {
        getMovies() {
           //return JSON.parse(JSON.stringify(this.movies));
            if(this.title==="" && this.yearStart ==="" && this.yearEnd === "" && this.cast === null) return this.movies;
            return filter((this.movies),(movie) =>{
                if(this.title !== "" && !includes(movie.title, this.title)) return false;
                if(this.yearStart !== "" && movie.year < this.yearStart) return false;
                if(this.yearEnd !== "" && movie.year > this.yearEnd) return false;
                if(this.cast !== null && intersection(this.cast, movie.cast).length!==this.cast.length) return false;
                return true;
            })
        },
    },
    actions: {
        setFilters(filters){
            this.title = filters.title;
            this.yearStart = filters.yearStart;
            this.yearEnd = filters.yearEnd;
            this.cast = filters.cast;
        }
    }
})

