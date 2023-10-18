import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectErrorMessage,
  setError,
  clearError,
} from '../../redux/slices/errorSlice';

const Error = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      style={{
        fontSize: '14px',
      }}
    />
  );
};

export default Error;
