import styles from './App.module.scss';
import { GiBookshelf } from 'react-icons/gi';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <GiBookshelf className={styles.logo} />
        <h1 className={styles.headerText}>Book Library App</h1>
      </header>
    </div>
  );
}

export default App;
