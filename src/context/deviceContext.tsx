
import React, {createContext, ReactNode, useEffect, useState} from 'react'; 
import NetInfo from "@react-native-community/netinfo";

interface DeviceContext {
  isConnected: boolean | null;
}

interface DeviceContextProps {
  children: ReactNode;
}

export const DeviceContext = createContext({} as DeviceContext); 


export default function DeviceContextProvider({
  children
}: DeviceContextProps){
  const [isConnected, setIsConnected] = useState<boolean | null>(null); 
  
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    
    return unsubscribe();
  },[]); 

  return(
    <DeviceContext.Provider value={{isConnected}}>
      {children}
    </DeviceContext.Provider>
  ); 
}



