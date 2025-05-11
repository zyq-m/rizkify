import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Easing,
} from 'react-native';
import { Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
// import AppLoading from 'expo-app-loading';

const { width } = Dimensions.get('window');

export default function CustomSplash() {
  const [fontsLoaded] = useFonts({ Poppins_800ExtraBold, Lobster_400Regular });
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300, // slower fade duration
      delay: 2000, // optional longer delay
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        { opacity: fadeAnim, zIndex: 999 },
      ]}
    >
      <Image
        source={require('../assets/images/icon.png')}
        style={{
          width: width * 0.35,
          height: width * 0.35,
          marginBottom: 32,
          resizeMode: 'contain',
        }}
      />
      <Text style={styles.title}>Rizkify</Text>
      <Text style={styles.desc}>
        Connecting Surplus, Empowering Communities
      </Text>
    </Animated.View>
  );
}
``;
const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8E1',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Poppins_800ExtraBold',
    color: '#176A3E',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  desc: {
    fontSize: 16,
    fontFamily: 'Lobster_400Regular',
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
