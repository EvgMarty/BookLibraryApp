import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
  name: ' books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
    },
    deletedBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    },
  },
});

//Выбор определенной части состояние на селекторы
export const selectBooks = (state) => state.books;

//на диспатчи
export const { addBook, deletedBook, toggleFavorite } = booksSlice.actions;

//на стор
export default booksSlice.reducer;
