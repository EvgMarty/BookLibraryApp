import styles from './BookForm.module.scss';
import booksData from '../../data/books.json';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fechBook } from '../../redux/slices/booksSlice';
import createBookWhithId from '../../utils/createBooksWithId';
import { setError } from '../../redux/slices/errorSlice';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoadind, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //Отправка кнги в стор
  const handlerSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWhithId({ title, author }, 'manual');
      dispatch(addBook(book));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You must title and author'));
    }
  };

  //Добавление рандомной книги в stor
  const handleAddRandomBook = () => {
    //получаем рандомное число  в зависимости от длины масива booksData
    const randomIndex = Math.floor(Math.random() * booksData.length);
    //Выбираем из масива одну книгу в зависимости от рандомного числа
    const randomBooks = booksData[randomIndex];
    //Функция добавляющая йд и исфафорит
    const randomBooksWithId = createBookWhithId(randomBooks, 'random');

    dispatch(addBook(randomBooksWithId));
  };

  //Добавление рандомной книги c получением API
  const handleAddRandomBookVieApi = async () => {
    try {
      setIsLoading(true);
      await dispatch(fechBook('http://localhost:4000/random-book-delayed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.appBlock}>
      <h2>Add a New Book</h2>
      <form className={styles.formWrap} onSubmit={handlerSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="author">
            Author:
          </label>
          <input
            className={styles.input}
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className={styles.btnWrap}>
          <button className={styles.btn} type="submit">
            Add Book
          </button>
          <button
            className={styles.btn}
            type="button"
            onClick={handleAddRandomBook}
          >
            Add Random
          </button>
          <button
            className={styles.btn}
            type="button"
            disabled={isLoadind}
            onClick={handleAddRandomBookVieApi}
          >
            {isLoadind ? (
              <>
                <FaSpinner className={styles.spinner} />
                <span>Loading...</span>
              </>
            ) : (
              'Add Random vie API'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
