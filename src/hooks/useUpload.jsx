// /* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export const useUpload = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [videoPath, setVideoPath] = useState('');

  // Cleanup
  const [cancelled, setCancelled] = useState(false);
  const checkCancelled = () => {
    if (cancelled) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  const uploadFile = (collection, file) => {
    checkCancelled();
    setLoading(true);

    if (file === null) return;

    const storage = getStorage();
    const storageRef = ref(storage, `${collection}/${Date.now()}${v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressStatus =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(`Progresso: ${progressStatus} % completo`);
        switch (snapshot.state) {
          case 'paused':
            setMessage('Envio pausado');

            break;

          default:
            setMessage('Enviando ...');
            break;
        }
      },
      (e) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (e.code) {
          case 'storage/unauthorized':
            setError('O usuário não tem autorização para acessar o objeto.');
            setLoading(false);
            break;
          case 'storage/canceled':
            setError('O usuário cancelou o upload');
            setLoading(false);
            break;
          default:
            setError('Ocorreu um erro, tente novamente.');
            setLoading(false);
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (collection === 'files') {
            setFilePath(downloadURL);
          }
          if (collection === 'videos') {
            setVideoPath(downloadURL);
          }
        });
        setLoading(false);
      }
    );

    // return ;
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    uploadFile,
    error,
    message,
    progress,
    loading,
    filePath,
    videoPath,
  };
};
