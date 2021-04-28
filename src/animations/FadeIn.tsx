import React, { useEffect, useRef, ReactNode } from "react";
import { Animated, Easing } from "react-native";

interface FadeInProps {
  children: ReactNode;
}
export function FadeIn({ children }: FadeInProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    Animated.timing(opacity, {
      duration: 600,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };
  return <Animated.View style={{ flex: 1, opacity }}>{children}</Animated.View>;
}
