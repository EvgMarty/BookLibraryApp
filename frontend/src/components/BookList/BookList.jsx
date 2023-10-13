import styles from './BookList.module.scss';
import { useSelector } from 'react-redux';

const BookList = () => {
  const books = useSelector((state) => state.books);

  return (
    <div className={styles.appBlock}>
      <h2>Book List</h2>
      <div>
        {books.length === 0 ? (
          <p>There isn't a single book.</p>
        ) : (
          <ul className={styles.booksWrap}>
            {books.map((book, i) => {
              return (
                <li key={book.id}>
                  {++i}. {book.title} by{' '}
                  <span className={styles.author}>{book.author}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookList;
