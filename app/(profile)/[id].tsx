import {
  Text,
  Avatar,
  Box,
  Heading,
  Button,
  VStack,
  HStack,
} from 'native-base';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

export default function EditProfile() {
  return (
    <VStack safeArea={4} space="4">
      <Box background="white" px="4" py="6" rounded="sm" alignItems="center">
        <Avatar
          bg="purple.600"
          alignSelf="center"
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
          }}
        >
          RB
        </Avatar>
        <Heading size="md" mt="2">
          Amin Ashraf
        </Heading>
        <Text color="gray.500">example@email.com</Text>
        <Button rounded="full" px="6" mt="4">
          Edit profile
        </Button>
      </Box>
      <VStack background="white" px="5" py="6" rounded="sm" space="8">
        <Pressable onPress={() => router.push('/(sidebar)/listing')}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space="3" alignItems="center">
              <MaterialIcons
                name="format-list-bulleted"
                size={20}
                color="black"
              />
              <Text>My Listings</Text>
            </HStack>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
          </HStack>
        </Pressable>
        <Pressable>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space="3" alignItems="center">
              <AntDesign name="eyeo" size={20} color="black" />
              <Text>Change password</Text>
            </HStack>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
          </HStack>
        </Pressable>
        <Pressable onPress={() => router.replace('/')}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space="3" alignItems="center">
              <MaterialIcons name="logout" size={20} color="black" />
              <Text>Logout</Text>
            </HStack>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
}
