import styles from './App.module.scss';
import { GiBookshelf } from 'react-icons/gi';
import BookForm from './components/BookForm/BookForm';
import Filter from './components/Filter/Filter';
import BookList from './components/BookList/BookList';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <GiBookshelf className={styles.logo} />
        <h1 className={styles.headerText}>Book Library App</h1>
      </header>
      <main className={styles.appMain}>
        <div className={styles.leftColumn}>
          <BookForm />
        </div>
        <div className={styles.rightColumn}>
          <Filter />
          <BookList />
        </div>
      </main>
    </div>
  );
}

export default App;
