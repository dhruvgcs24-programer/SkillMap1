import { View, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import { router } from 'expo-router'

import { supabase } from '../src/services/supabase'

export default function SplashScreen() {
  const scale = useRef(new Animated.Value(0.5)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start()

    checkSession()
  }, [])

  const checkSession = async () => {
    setTimeout(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.replace('/home')
      } else {
        router.replace('/login')
      }
    }, 2500)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.Image
        source={require('../assets/images/skillmap_logo.png')}
        style={{
          width: 250,
          height: 250,
          opacity,
          transform: [{ scale }],
        }}
      />
    </View>
  )
}