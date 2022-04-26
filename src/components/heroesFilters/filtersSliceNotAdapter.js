import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => { // Это функция может принимать параметры и должна возвращать промис
        const { request } = useHttp();
        return await request("http://localhost:3001/filters") // Данные отсюда переходят в action.payload
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => { state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;