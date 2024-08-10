
import React, { useEffect, useState } from 'react';
import { ref, onValue, set, onDisconnect } from 'firebase/database';
import { realtimeDb } from '../firebase-config';
import { auth } from '../firebase-config'; 

const Status = () => {
  const [isOnline, setIsOnline] = useState(null); 

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      
      setIsOnline(null);
      return;
    }

    const userStatusDatabaseRef = ref(realtimeDb, `/status/${user.uid}`);

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: Date.now(),
    };

    const isOnlineForDatabase = {
      state: 'online',
      last_changed: Date.now(),
    };

    const connectedRef = ref(realtimeDb, '.info/connected');

    const handleConnectionChange = (snapshot) => {
      const isConnected = snapshot.val();
      if (isConnected) {
        
        onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
          set(userStatusDatabaseRef, isOnlineForDatabase);
          setIsOnline(true);
        }).catch((error) => {
          console.error("Failed to update online status: ", error);
        });
      } else {
        setIsOnline(false);
      }
    };

    
    const connectionListener = onValue(connectedRef, handleConnectionChange);

    
    return () => {
      
      connectionListener();
      
      onDisconnect(userStatusDatabaseRef).cancel();
      
      if (user) {
        set(userStatusDatabaseRef, isOfflineForDatabase);
      }
    };
  }, [auth.currentUser]); 

  useEffect(() => {
    const handleAuthStateChange = (user) => {
      if (!user) {
        
        setIsOnline(false);
        const userStatusDatabaseRef = ref(realtimeDb, `/status/${auth.currentUser.uid}`);
        set(userStatusDatabaseRef, { state: 'offline', last_changed: Date.now() });
      }
    };

    
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);

    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {isOnline === null ? (
        <p>Loading...</p> 
      ) : isOnline ? (
        <p className='text-green-600 w-2 h-2 rounded-full bg-green-600 animate-pulse'></p>
      ) : (
        <p className='text-red-600 w-2 h-2 rounded-full bg-red-600'></p>
      )}
    </div>
  );
};

export default Status;
