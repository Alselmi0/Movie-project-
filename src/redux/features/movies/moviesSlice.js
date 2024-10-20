import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Retrieve API key and base URL from environment variables
const api_key = import.meta.env.VITE_API_KEY;
const base_url = import.meta.env.VITE_BASE_URL;

export const getMovies = createAsyncThunk("movies/getMovies", async ({ endpoint, language }) => {
    let movies = [];
    let total_pages = endpoint === "upcoming" || endpoint === "now_playing" ? 5 : 15;

    try {
        for (let current_page = 1; current_page <= total_pages; current_page++) {
            const response = await axios.get(`${base_url}/movie/${endpoint}?api_key=${api_key}&language=${language}&page=${current_page}`);
            movies = [...movies, ...response.data.results];
        }

        // Remove duplicate movies based on title
        const unique_movies = [...new Map(movies.map(item => [item.title, item])).values()];
        return unique_movies;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error; // Ensure the error is thrown for Redux to catch
    }
});

const initialState = {
    loading: false,
    movies: [],
    error: "",
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.loading = true;
                state.error = ""; // Clear previous errors
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
            });
    },
});

export default moviesSlice.reducer;