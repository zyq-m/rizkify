import { router } from 'expo-router';
import { Text, Box, HStack, Avatar, Heading, FlatList } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';

export default function NearMe() {
  return (
    <Box mx="2">
      <FlatList
        data={NEAR_USER}
        renderItem={({ item }) => <UserNearMe {...item} />}
        ItemSeparatorComponent={() => <Box height="1" />}
      />
    </Box>
  );
}

const NEAR_USER: NearUser[] = [
  {
    id: 1,
    avatar:
      'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 50,
    name: 'Amin',
  },
  {
    id: 2,
    avatar:
      'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 100,
    name: 'Ahmad',
  },
];

type NearUser = {
  id: string | number;
  avatar: string;
  name: string;
  location: number;
};

function UserNearMe(user: NearUser) {
  return (
    <Pressable onPress={() => router.push(`/(chat)/${user.name}`)}>
      <HStack
        space={3}
        alignItems="center"
        bgColor="white"
        py="5"
        px="3"
        rounded="sm"
      >
        <Avatar source={{ uri: user.avatar }}></Avatar>
        <Box flex="1">
          <Heading fontSize="md">{user.name}</Heading>
          <Text color="gray.500" fontSize="sm">
            {user.location} away from you
          </Text>
        </Box>
      </HStack>
    </Pressable>
  );
}
