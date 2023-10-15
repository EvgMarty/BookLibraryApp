import styles from './BookList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletedBook, toggleFavorite } from '../../redux/books/actionCreators';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selecOnlyFavoritFilter,
} from '../../redux/slices/filterSlice';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';

const BookList = () => {
  const dispatch = useDispatch();

  //Селекторы
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoritFilter = useSelector(selecOnlyFavoritFilter);

  //Диспатчи
  const handlerDeleteBook = (id) => {
    dispatch(deletedBook(id));
  };

  const handlerToggleFavorit = (id) => {
    dispatch(toggleFavorite(id));
  };

  //создаем новый масив  прошедший фильтрацию по тайтлу и автору
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoritFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  return (
    <div className={styles.appBlock}>
      <h2>Book List</h2>
      <div>
        {books.length === 0 ? (
          <p className={styles.noneBooks}>Booklist is empty.</p>
        ) : (
          <ul className={styles.booksWrap}>
            {filteredBooks.map((book, i) => {
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
