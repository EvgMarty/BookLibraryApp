import styles from './Filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handlerTitleFilterChange = (e) => {
    return dispatch(setTitleFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.appBlock}>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Filter by title..."
          onChange={handlerTitleFilterChange}
          value={titleFilter}
        />
        <button className={styles.btn} title='Reset' onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
