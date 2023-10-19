import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWhithId from '../../utils/createBooksWithId';
import { setError } from './errorSlice';
const initialState = [];

//Получение книги по API
export const fechBook = createAsyncThunk(
  'books/fechBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

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
  //OPTION 1
  extraReducers: (builder) => {
    builder.addCase(fechBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        return [...state, createBookWhithId(action.payload, 'API')];
      }
    });
  },
  // //OPTION 2
  // extraReducers: {
  //   [fechBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       return [...state, createBookWhithId(action.payload, 'API')];
  //     }
  //   },
  // },
});

//Выбор определенной части состояние на селекторы
export const selectBooks = (state) => state.books;

//на диспатчи
export const { addBook, deletedBook, toggleFavorite } = booksSlice.actions;

//на стор
export default booksSlice.reducer;
