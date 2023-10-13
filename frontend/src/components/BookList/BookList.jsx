import styles from './BookList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletedBook } from '../../redux/books/actionCreators';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handlerDeleteBook = (id) => {
    dispatch(deletedBook(id));
  };

  return (
    <div className={styles.appBlock}>
      <h2>Book List</h2>
      <div>
        {books.length === 0 ? (
          <p className={styles.noneBooks}>Booklist is empty.</p>
        ) : (
          <ul className={styles.booksWrap}>
            {books.map((book, i) => {
              return (
                <li key={book.id}>
                  <div>
                    {++i}. {book.title} by{' '}
                    <span className={styles.author}>{book.author}</span>
                  </div>
                  <button
                    className={styles.deletBtn}
                    onClick={() => handlerDeleteBook(book.id)}
                  >
                    Delete
                  </button>
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
