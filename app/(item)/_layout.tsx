import StackHeader from '@/components/StackHeader';
import { Stack } from 'expo-router';

export default function ItemLayout() {
  return (
    <Stack
      screenOptions={{
        header: (header) => <StackHeader {...header} menu={false} />,
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Item' }} />
      <Stack.Screen name="cart" options={{ title: 'Cart' }} />
      <Stack.Screen name="wishList" options={{ title: 'Wishlist' }} />
      <Stack.Screen name="location" options={{ title: 'Set Locaton' }} />
      <Stack.Screen name="history" options={{ title: 'Requested Item' }} />
    </Stack>
  );
}
