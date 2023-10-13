import styles from './BookList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletedBook, toggleFavorite } from '../../redux/books/actionCreators';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  //Отправка айд при нажатии на кнопку удалить
  const handlerDeleteBook = (id) => {
    dispatch(deletedBook(id));
  };
  //Отправка айд при нажатии на кнопку фаворит
  const handlerToggleFavorit = (id) => {
    dispatch(toggleFavorite(id));
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
                  <div className={styles.btnWrap}>
                    <span onClick={() => handlerToggleFavorit(book.id)}>
                      {book.isFavorite ? (
                        <BsBookmarkStarFill className={styles.togleFavorit} />
                      ) : (
                        <BsBookmarkStar className={styles.togleFavorit} />
                      )}
                    </span>

                    <button
                      className={styles.deletBtn}
                      title="Delete"
                      onClick={() => handlerDeleteBook(book.id)}
                    >
                      Delete
                      <RiDeleteBin2Fill />
                    </button>
                  </div>
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
