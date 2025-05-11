import {
  Text,
  Avatar,
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Image,
} from 'native-base';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { User } from '@/constants/type';
import api, { BASE_URL } from '@/utils/axios';
import { useIsFocused } from '@react-navigation/native';

export default function Profile() {
  const [profile, setProfile] = useState<User>();
  const isFocused = useIsFocused();

  const fetchProfile = async () => {
    try {
      const profileRes = await api.get('/profile');
      setProfile(profileRes.data);
      console.log(profileRes.data);
    } catch (error) {
      // do popup
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [isFocused]);

  return (
    <VStack space="4">
      <Box background="white" px="4" py="6" rounded="sm" alignItems="center">
        <Avatar
          alignSelf="center"
          size="xl"
          source={{
            uri: `${BASE_URL}/${profile?.avatar}`,
          }}
        >
          {profile?.name?.slice(0, 2)}
        </Avatar>
        <Heading textTransform="capitalize" size="md" mt="2">
          {profile?.name}
        </Heading>
        <Text color="gray.500">{profile?.email}</Text>
        <Button
          rounded="full"
          px="6"
          mt="4"
          bg="#EFB255"
          onPress={() => router.push(`/(profile)/update`)}
        >
          Edit profile
        </Button>
      </Box>
      <VStack background="white" px="5" py="6" rounded="sm" space="8">
        {/* <Pressable onPress={() => router.push('/(item)/wishList')}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space="3" alignItems="center">
              <MaterialIcons
                name="format-list-bulleted"
                size={20}
                color="black"
              />
              <Text>History</Text>
            </HStack>
            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
          </HStack>
        </Pressable> */}
        <Pressable onPress={() => router.push('/(profile)/changePassword')}>
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
