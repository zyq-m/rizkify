import { Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import CustomSplash from '@/components/CustomSplash';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, [showSplash]);

  return (
    <NativeBaseProvider>
      {showSplash ? (
        <CustomSplash />
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="signup" />
        </Stack>
      )}
    </NativeBaseProvider>
  );
}
