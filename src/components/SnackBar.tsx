import React, { ReactNode, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native'; 
import colors from '../styles/colors';

interface SnackBarProps {
  message: ReactNode;
  bottom?: boolean; 
  top?: boolean;  
  type?: 'sucess' | 'error' | 'info';  
  isOpen: boolean; 
}

const SNACK_HEIGHT = 20; 

export function SnackBar({ message, top=false, type='info', isOpen=false } : SnackBarProps){

  const containerVisibilityAnimation = useRef(new Animated.Value(-SNACK_HEIGHT)).current;
  
  useEffect(() => {
    if(isOpen){
      openSnack()
    } else {
      closeSnack()
    }
  }, [isOpen])

   const getContainerBgStyleByType = () => {
      const containerBgStyleByType = {
        'info': styles.infoContainer, 
        'sucess': styles.sucessContainer, 
        'error': styles.errorContainer
      }
      return containerBgStyleByType[type]
    }

    const getContainerPositionByStatus = () => {
      if(top ){
        return styles.containerTop
      }
      return styles.containerBottom
    }

    const getContainerVisibility = () => {
        return {transform: [{translateY: containerVisibilityAnimation}]}
    }

    const openSnack = () => {
      Animated.timing(containerVisibilityAnimation, {
        duration: 400, 
        toValue: 0, 
        useNativeDriver: true
      }).start()
    }

    const closeSnack = () => {
      Animated.timing(containerVisibilityAnimation, {
        duration: 400, 
        toValue: -SNACK_HEIGHT, 
        useNativeDriver: true
      }).start()
    }

    return(
      <Animated.View style={[styles.container, getContainerPositionByStatus() , getContainerBgStyleByType(), getContainerVisibility() ]}>
        <Text style={styles.message} >{message}</Text>
      </Animated.View>
    )
}


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