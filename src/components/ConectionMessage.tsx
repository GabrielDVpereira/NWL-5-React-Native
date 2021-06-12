import React, { useState, useEffect } from 'react'; 
import { SnackBar } from './SnackBar /SnackBar';
import { useDevice } from '../hooks/useDevice'; 

export function ConnectionMessage(){
  const { isConnected } = useDevice();
  const [showSnack, setShowSnack] = useState(isConnected || false); 

  useEffect(() => {
    if(isConnected){
      setTimeout(() => setShowSnack(false), 1500)
    } else {
      setShowSnack(true)
    }
  }, [isConnected])
  
  const onlineMsg = 'Conectado'; 
  const offlineMsg = 'Sem conexão a internet'; 

  const snackType = isConnected ? 'sucess' : 'error'; 

  return <SnackBar  />
}