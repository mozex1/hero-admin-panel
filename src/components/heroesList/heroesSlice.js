import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => { // Это функция может принимать параметры и должна возвращать промис
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes") // Данные отсюда переходят в action.payload
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'}, // Потому что они используются только в fetchHeroes, а их мы прописали ниже
        // heroesFetched: (state, action) => {
        //             state.heroesLoadingStatus = 'idle';
        //             state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroCreated: (state, action) => {heroesAdapter.addOne(state, action.payload)},
        heroDeleted: (state, action) => {heroesAdapter.removeOne(state, action.payload)}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') return heroes;
        else return heroes.filter(item => item.element === filter)
    }  
);

export const {
    heroesFetching,
    heroesFetched, 
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;