import { useState, useEffect, useReducer } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import db from '../firebase/config';

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERT_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [canceled, setCanceled] = useState(false);
  const checkCancelBeforeDispatch = (action) => {
    if (!canceled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: 'LOADING ',
    });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertDoc = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: 'INSERT_DOC',
        payload: insertDoc,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: 'ERROR',
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  return { insertDocument, response };
};
