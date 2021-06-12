import React, { ReactNode, useEffect, useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native'; 
import colors from '../../styles/colors';

interface SnackBarOptions {
  type?: 'sucess' | 'error' | 'info';  
  top?: boolean;  
  bottom?: boolean; 
  message: ReactNode;
}
interface SnackRefProps {
  openSnack: () => void; 
  closeSnack: () => void; 
}

const SNACK_HEIGHT = 20; 

export const SnackBar:ForwardRefRenderFunction<SnackRefProps> = (_, ref) => {

  const containerVisibilityAnimation = useRef(new Animated.Value(SNACK_HEIGHT)).current;
  const snackOptions = useRef<SnackBarOptions>({ message: ''})
  
 
   const getContainerBgStyleByType = () => {
      const containerBgStyleByType = {
        'info': styles.infoContainer, 
        'sucess': styles.sucessContainer, 
        'error': styles.errorContainer
      }
      return containerBgStyleByType[snackOptions.current?.type || 'info']
    }

    const getContainerPositionByStatus = () => {
      if(snackOptions.current?.top){
        return styles.containerTop
      }
      return styles.containerBottom
    }

    const getContainerVisibility = () => {
        return {transform: [{translateY: containerVisibilityAnimation }]}
    }

    const openSnack = useCallback(() => {
      Animated.timing(containerVisibilityAnimation, {
        duration: 400, 
        toValue: 0, 
        useNativeDriver: true
      }).start()
    },[])

    const closeSnack = useCallback(() => {
      Animated.timing(containerVisibilityAnimation, {
        duration: 400, 
        toValue: -SNACK_HEIGHT, 
        useNativeDriver: true
      }).start()
    },[])

    useImperativeHandle(ref, () => ({
      openSnack, 
      closeSnack
    }), [openSnack,closeSnack])

    return(
      <Animated.View style={[styles.container, getContainerPositionByStatus() , getContainerBgStyleByType(), getContainerVisibility() ]}>
        <Text style={styles.message} >{snackOptions.current?.message}</Text>
      </Animated.View>
    )
}

export default forwardRef(SnackBar)


const styles = StyleSheet.create({
  container: {
    height: SNACK_HEIGHT,
    position: 'absolute', 
    left: 0, 
    right: 0, 
    alignItems: 'center'
  }, 
  containerTop: {
    top: 0, 
  }, 
 
  containerBottom: {
    bottom: 0,
  }, 

  sucessContainer: {
    backgroundColor: colors.green, 
  }, 
  errorContainer: {
    backgroundColor: colors.red, 
  }, 
  infoContainer: {
    backgroundColor: colors.blue, 
  },
  message: {
    color: colors.white
  }
})