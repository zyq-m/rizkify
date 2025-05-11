import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { HStack, Input, Icon } from 'native-base';

export default function TabHeader() {
  return (
    <HStack
      safeArea
      space="4"
      p="4"
      justifyContent="space-between"
      alignItems="center"
      width="full"
      backgroundColor="white"
    >
      <Input
        placeholder="Search Items"
        borderRadius="4"
        flex="1"
        px="1"
        bgColor="warmGray.100"
        InputLeftElement={
          <Icon mx="3" size="lg" as={<MaterialIcons name="search" />} />
        }
      />
      <HStack space="4">
        <Link href="/cart">
          <Icon as={MaterialIcons} name="shopping-cart" size="xl" />
        </Link>
        <Link href="/(chat)">
          <Icon as={MaterialIcons} name="chat" size="lg" />
        </Link>
      </HStack>
    </HStack>
  );
}
