import styles from './Filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoritFilter,
  resetFilters,
  selectTitleFilter,
  selectAuthorFilter,
  selecOnlyFavoritFilter,
} from '../../redux/slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  //Селекторы
  const titleFilter = useSelector(selectTitleFilter);
  const titleAuthor = useSelector(selectAuthorFilter);
  const onlyFavoritFilter = useSelector(selecOnlyFavoritFilter);

  //Диспатчи
  const handleTitleFilterChange = (e) => {
    return dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorilterChange = (e) => {
    return dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteFiltreChange = () => {
    return dispatch(setOnlyFavoritFilter());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.filterBlock}>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Filter by title..."
          onChange={handleTitleFilterChange} //Отправка действия
          value={titleFilter} //подкбчили инпут к состоянию
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Filter by author..."
          onChange={handleAuthorilterChange} //Отправка действия
          value={titleAuthor} //подкбчили инпут к состоянию
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="favorit">
          Only Favorit
          <input
            id="favorit"
            type="checkbox"
            checked={onlyFavoritFilter}
            onChange={handleOnlyFavoriteFiltreChange}
          />
        </label>
      </div>
      <button
        className={styles.btn}
        title="Reset"
        onClick={handleResetFilters} //Отправка действия
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
