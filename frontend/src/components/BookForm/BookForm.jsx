import styles from './BookForm.module.scss';
import { useState } from 'react';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //dispach action
      setTitle('');
      setAuthor('');
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
        <button className={styles.btn} type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
