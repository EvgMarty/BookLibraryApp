import styles from './BookList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletedBook, toggleFavorite } from '../../redux/slices/booksSlice';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selecOnlyFavoritFilter,
} from '../../redux/slices/filterSlice';
import { selectBooks } from '../../redux/slices/booksSlice';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';

const BookList = () => {
  const dispatch = useDispatch();

  //Селекторы
  const books = useSelector(selectBooks);
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

  //Подсветка текста
  const highLightMatch = (text, filter) => {
    if (!filter) return text;

    const regexp = new RegExp(`(${filter})`, 'gi');

    return text.split(regexp).map((subString, i) => {
      if (subString.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className={styles.highLight}>
            {subString}
          </span>
        );
      }
      return subString;
    });
  };

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
                    {++i}. {highLightMatch(book.title, titleFilter)} by{' '}
                    <span className={styles.author}>
                      {highLightMatch(book.author, authorFilter)}
                    </span>
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
