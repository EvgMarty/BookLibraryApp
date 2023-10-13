import * as actionTypes from './actionTypes';

export const addBook = (newBook) => {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};

export const deletedBook = (id) => {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: id,
  };
};


