import StackHeader from '@/components/StackHeader';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        header: (header) => <StackHeader {...header} menu={false} />,
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Edit profile' }} />
      <Stack.Screen
        name="changePassword"
        options={{ title: 'Change password' }}
      />
      <Stack.Screen name="update" options={{ title: 'Update profile' }} />
    </Stack>
  );
}
