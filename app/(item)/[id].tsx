import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  ScrollView,
  Image,
  Box,
  Avatar,
  Text,
  HStack,
  VStack,
  Icon,
  Pressable,
} from 'native-base';
import { router, useLocalSearchParams } from 'expo-router';
import { ItemT } from '@/constants/type';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import MapView, { Marker } from 'react-native-maps';
import api, { BASE_URL } from '@/utils/axios';
import { useNavigation } from 'expo-router';
import dayjs from 'dayjs';
import relativetime from 'dayjs/plugin/relativeTime';
import { useLocationStore } from '@/store/store';
import ConfirmationModal from '@/components/RequestConfirmation';

export default function ItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<ItemT>();
  const navigation = useNavigation();
  const { location, setLocation } = useLocationStore();

  const fetchItem = async () => {
    try {
      const itemRes = await api.get(`/item/${id}`);
      setItem({
        ...itemRes.data,
        timestamp: dayjs().to(itemRes.data?.timestamp).toString(),
      });
      setLocation(itemRes.data.location);
      navigation.setOptions({ title: itemRes.data.name });
    } catch (error) {
      // do popup
      console.log(error);
    }
  };

  useEffect(() => {
    dayjs.extend(relativetime);
    fetchItem();
  }, [id]);

  return (
    <ScrollView>
      <AspectRatio>
        <Image
          key={item?.images?.[0].uri}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/${item?.images?.[0].uri}`,
          }}
          alt="View"
          mb="3"
        />
      </AspectRatio>
      <Box px="3" safeAreaBottom={3}>
        <HStack justifyContent="flex-end">
          <Pressable>
            <Icon
              as={MaterialCommunityIcons}
              name="cards-heart-outline"
              size="lg"
              color="red.400"
            />
          </Pressable>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <HStack space="2" alignItems={'center'} mb="4">
            <Avatar
              size="sm"
              source={{
                uri: `${BASE_URL}/${item?.user?.avatar}`,
              }}
            >
              {item?.user?.name?.slice(0, 2)}
            </Avatar>
            <Text>{item?.user?.name}</Text>
          </HStack>
          <HStack space="1" alignItems="center" mb="3">
            <Icon as={MaterialCommunityIcons} name="clock-outline" />
            <Text color="gray.400" fontSize="xs">
              {item?.timestamp ?? ''}
            </Text>
          </HStack>
        </HStack>

        <VStack space="6" mb="5">
          <Text fontWeight="medium">{item?.quantity} item left</Text>

          <Text fontWeight="medium">Category: {item?.category}</Text>

          <Box>
            <Text fontWeight="medium">Description:</Text>
            <Text>{item?.description}</Text>
          </Box>

          <Box>
            <Text fontWeight="medium">Condition:</Text>
            <Text>{item?.condition}</Text>
          </Box>

          <Text fontWeight="medium">Pickup time: By arrangement</Text>

          <Box>
            <Pressable onPress={() => router.push('/(item)/location')}>
              <HStack py="4" alignItems="center" justifyContent="space-between">
                <Text>Location</Text>
                <MaterialIcons name="navigate-next" size={24} color="black" />
              </HStack>
            </Pressable>
            <Box overflow="hidden" borderRadius="md">
              {/* <MapView
                showsUserLocation
                style={{ width: '100%', height: 200 }}
                initialRegion={{
                  latitude: location?.latitude ?? 5.33659,
                  longitude: location?.longitude ?? 103.141998,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {location && <Marker coordinate={{ ...location }} />}
              </MapView> */}
            </Box>
          </Box>
        </VStack>
        {item && <ConfirmationModal item={item} id={id} />}
      </Box>
    </ScrollView>
  );
}
