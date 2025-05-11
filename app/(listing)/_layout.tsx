import StackHeader from '@/components/StackHeader';
import { Stack } from 'expo-router';

export default function ListingLayout() {
  return (
    <Stack
      screenOptions={{
        header: (header) => <StackHeader {...header} menu={false} />,
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Item' }} />
    </Stack>
  );
}
