import StackHeader from '@/components/StackHeader';
import { useGlobalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';

export default function ChatLayout() {
  const { user } = useGlobalSearchParams<{ user: string }>();

  return (
    <Stack
      screenOptions={{
        header: (header) => <StackHeader {...header} menu={false} />,
      }}
    >
      <Stack.Screen name="[user]" options={{ title: user }} />
    </Stack>
  );
}
