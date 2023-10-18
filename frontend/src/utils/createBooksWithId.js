import { v4 as uuidv4 } from 'uuid';

const createBookWhithId = (book, source) => {
  return {
    ...book,
    source,
    isFavorite: false,
    id: uuidv4(),
  };
};

export default createBookWhithId;
