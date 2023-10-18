import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWhithId from '../../utils/createBooksWithId';
const initialState = [];

export const fechBook = createAsyncThunk('books/fechBook', async () => {
  const res = await axios.get('http://localhost:5000/random-book');
  return res.data;
});

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
  extraReducers: (builder) => {
    builder.addCase(fechBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        return [...state, createBookWhithId(action.payload, 'API')];
      }
    });
    builder.addCase(fechBook.rejected, (state, action) => {
      console.log(action);
    });
  },
});

//Выбор определенной части состояние на селекторы
export const selectBooks = (state) => state.books;

//на диспатчи
export const { addBook, deletedBook, toggleFavorite } = booksSlice.actions;

//на стор
export default booksSlice.reducer;
