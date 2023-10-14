import styles from './BookForm.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import createBookWhithId from '../../utils/createBooksWithId';
import booksData from '../../data/books.json';
import { addBook } from '../../redux/books/actionCreators';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  //Отправка кнги в стор
  const handlerSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWhithId({ title, author });

      dispatch(addBook(book));

      setTitle('');
      setAuthor('');
    }
  };

  //Добавление рандомной книги в stor
  const handleAddRandomBook = () => {
    //получаем рандомное число  в зависимости от длины масива booksData
    const randomIndex = Math.floor(Math.random() * booksData.length);
    //Выбираем из масива одну книгу в зависимости от рандомного числа
    const randomBooks = booksData[randomIndex];
    //Функция добавляющая йд и исфафорит
    const randomBooksWithId = createBookWhithId(randomBooks);

    dispatch(addBook(randomBooksWithId));
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
        </div>
      </form>
    </div>
  );
};

export default BookForm;
