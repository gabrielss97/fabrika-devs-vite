import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export const useUpload = () => {
  // Message states
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState(null);

  // Loading States
  const [fileLoading, setFileLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  // Path States
  const [filePath, setFilePath] = useState('');
  const [videoPath, setVideoPath] = useState('');

  // Cleanup (Evita o memory leak)
  const [canceled, setCanceled] = useState(false);
  const checkCanceled = () => {
    if (canceled) {
      return;
    }
  };

  // Função que envia o arquivo para a Storage do Firebase
  const uploadFile = (collection, file) => {
    checkCanceled();
    if (collection === 'files') {
      setFileLoading(true);
    } else if (collection === 'videos') {
      setVideoLoading(true);
    }

    // Se for vazio, retorna um erro
    if (file === null) {
      setError('Envie um arquivo!');
      if (collection === 'files') {
        setFileLoading(false);
      } else if (collection === 'videos') {
        setVideoLoading(false);
      }
      return;
    }

    // Método do FB para acessar a storage
    const storage = getStorage();
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, `${collection}/${Date.now()}${v4()}`);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Observa mudanças no estado, erros e a finalização do upload
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Pega o progresso do upload, incluindo o numero de bytes enviados e o total enviado

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
        // Lista completa de erros
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (e.code) {
          case 'storage/unauthorized':
            setError('O usuário não tem autorização para acessar o objeto.');
            if (collection === 'files') {
              setFileLoading(false);
            } else if (collection === 'videos') {
              setVideoLoading(false);
            }
            break;
          case 'storage/canceled':
            setError('O usuário cancelou o upload');
            if (collection === 'files') {
              setFileLoading(false);
            } else if (collection === 'videos') {
              setVideoLoading(false);
            }
            break;
          default:
            setError('Ocorreu um erro, tente novamente.');
            if (collection === 'files') {
              setFileLoading(false);
            } else if (collection === 'videos') {
              setVideoLoading(false);
            }
            break;
        }
      },
      async () => {
        // Upload completo, agora pegamos a URL
        const res = await getDownloadURL(uploadTask.snapshot.ref);

        if (collection === 'files') {
          setFilePath(res);
        }
        if (collection === 'videos') {
          setVideoPath(res);
        }

        if (collection === 'files') {
          setFileLoading(false);
        } else if (collection === 'videos') {
          setVideoLoading(false);
        }
      }
    );
  };

  // Ao sair da fução irá executar o cleanup
  useEffect(() => {
    return () => {
      setCanceled(true);
    };
  }, []);

  return {
    uploadFile,
    error,
    message,
    progress,
    fileLoading,
    videoLoading,
    filePath,
    videoPath,
  };
};
