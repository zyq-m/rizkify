import React, { useState } from 'react';
import {
  Actionsheet,
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useDisclose,
} from 'native-base';
import { router, useNavigation } from 'expo-router';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';

export default function HomeHeader() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isOpen, onOpen, onClose } = useDisclose();

  const [searchText, setSearchText] = useState('');

  function handleSearch() {
    router.navigate({
      pathname: '/(sidebar)/(tabs)/search',
      params: {
        name: searchText,
      },
    });
  }

  return (
    <Box safeAreaTop bg="#03402F">
      <HStack bg="#03402F" px="1" py="3" alignItems="center">
        <IconButton
          icon={<Icon as={MaterialIcons} name="menu" size="lg" color="white" />}
          onPress={() => navigation.openDrawer()}
        />
        <Input
          px="4"
          py="1"
          flex="1"
          variant="rounded"
          backgroundColor="white"
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          InputRightElement={
            <Icon as={AntDesign} name="search1" mr="4" color="muted.400" />
          }
          onSubmitEditing={handleSearch}
        />
        {route.name !== 'search' ? (
          <>
            <IconButton
              icon={<Icon as={FontAwesome5} name="cart-plus" color="white" />}
              onPress={() => router.push('/(item)/cart')}
            />
            <IconButton
              icon={<Icon as={AntDesign} name="heart" color="white" />}
              onPress={() => router.push('/(item)/wishList')}
            />
          </>
        ) : (
          <>
            <IconButton
              icon={<Icon as={FontAwesome5} name="filter" color="white" />}
              onPress={onOpen}
            />
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Box w="100%" h={60} px={4} justifyContent="center">
                  <Text
                    fontSize="16"
                    color="gray.500"
                    _dark={{
                      color: 'gray.300',
                    }}
                  >
                    Filter by
                  </Text>
                </Box>
                <Actionsheet.Item
                  startIcon={
                    <Icon as={FontAwesome5} name="map-marker-alt" size="6" />
                  }
                >
                  Nearest
                </Actionsheet.Item>
                <Actionsheet.Item
                  startIcon={<Icon as={FontAwesome5} name="globe" size="6" />}
                >
                  Latest post
                </Actionsheet.Item>
                <Actionsheet.Item
                  startIcon={
                    <Icon as={FontAwesome5} name="calendar-day" size="6" />
                  }
                >
                  List for
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </>
        )}
      </HStack>
    </Box>
  );
}
