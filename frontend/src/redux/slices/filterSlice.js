import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorit: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload };
    },
    setAuthorFilter: (state, action) => {
      return { ...state, author: action.payload };
    },
    setOnlyFavoritFilter: (state) => {
      return { ...state, onlyFavorit: !state.onlyFavorit };
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

//Выбор определенной части состояние на селекторы
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selecOnlyFavoritFilter = (state) => state.filter.onlyFavorit;

//на диспатчи
export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoritFilter,
  resetFilters,
} = filterSlice.actions;

//на стор
export default filterSlice.reducer;
