/* eslint-disable arrow-body-style */
// import db from '../firebase/config';

// import { getAuth } from 'firebase/auth';

import { httpsCallable } from 'firebase/functions';
import { useEffect, useState } from 'react';

export const useAddAdmin = (adminEmail) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup
  const [cancelled, setCancelled] = useState(false);
  const checkCancelled = () => {
    if (cancelled) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  const addAdmin = async () => {
    checkCancelled();
    setLoading(true);

    try {
      const addAdminRole = httpsCallable('addAdminRole');
      addAdminRole({ email: adminEmail }).then((result) => {
        return result;
      });
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    addAdmin,
    error,
    loading,
  };
};
