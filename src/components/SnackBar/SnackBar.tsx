import React, {useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction, useCallback, useState } from 'react';
import {  Text, StyleSheet, Animated, Pressable } from 'react-native'; 
import colors from '../../styles/colors';
import { SnackBarOptions, SnackHandles } from './types';


const SNACK_HEIGHT = 30; 

export const SnackBar:ForwardRefRenderFunction<SnackHandles> = (_, ref) => {
  const [snackOptions, setSnackOptions] = useState<SnackBarOptions>({} as SnackBarOptions); 
  const containerVisibilityAnimation = useRef(new Animated.Value(SNACK_HEIGHT)).current;

  const translateFromBottomToTop = { transform: [{translateY: containerVisibilityAnimation }] }
  const translateFroTopBottom = { transform: [{
    translateY: containerVisibilityAnimation.interpolate({
      inputRange: [0,SNACK_HEIGHT ], 
      outputRange: [0, -SNACK_HEIGHT]
      })
    }]
  }
  
 
   const getContainerBgStyleByType = () => {
      const containerBgStyleByType = {
        'info': styles.infoContainer, 
        'success': styles.sucessContainer, 
        'error': styles.errorContainer
      }
      return containerBgStyleByType[snackOptions.type || 'info']
    }

    const getContainerPositionByStatus = () => {
      if(snackOptions.top){
        return styles.containerTop
      }
      return styles.containerBottom
    }

    const getContainerVisibility = () => {
      if(snackOptions.top){
        return translateFroTopBottom
      }
        return translateFromBottomToTop
    }

    const openAndHideAnimation = (duration: number) => {
      Animated.sequence([
        timingAnimation(400, 0), 
        Animated.delay(duration), 
        timingAnimation(400, SNACK_HEIGHT)
      ]).start()
    }
  
    const timingAnimation = (duration: number, toValue: number) => {
      return Animated.timing(containerVisibilityAnimation, {
        duration, 
        toValue, 
        useNativeDriver: true
      })
    }
    const openSnack = useCallback((options: SnackBarOptions) => {
      setSnackOptions(options)
      if(options.durantion){
        return openAndHideAnimation(options.durantion);
      }
      timingAnimation(400, 0).start()
    },[])

    const closeSnack = useCallback(() => {
      timingAnimation(400, SNACK_HEIGHT).start()
    },[])

    useImperativeHandle(ref, () => ({
      openSnack, 
      closeSnack
    }), [openSnack,closeSnack])

    const onPress = () => {
      closeSnack()
      if(snackOptions.onPress){
        snackOptions.onPress()
      }
    }

    return(
      <Animated.View style={[styles.container, getContainerPositionByStatus() , getContainerBgStyleByType(), getContainerVisibility() ]}>
          <Pressable onPress={onPress} style={styles.pressContainer}>
            <Text style={styles.message} >{snackOptions.message}</Text>
          </Pressable>
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
  }, 
  pressContainer: {
    width: '100%', 
    height: "100%",
    justifyContent: 'center', 
    alignItems: 'center'
  }
})