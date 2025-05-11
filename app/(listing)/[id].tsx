import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativetime from 'dayjs/plugin/relativeTime';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import api from '@/utils/axios';
import { Box, ScrollView, Text } from 'native-base';
import { ItemT, RequestedUserT } from '@/constants/type';
import ListingCard from '@/components/ListingCard';
import RequestedUser from '@/components/RquestedUser';

type RequestedItem = ItemT & {
  requested_user: RequestedUserT[];
};

export default function ListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<RequestedItem>();
  const navigation = useNavigation();

  const fetchItem = async () => {
    try {
      const itemRes = await api.get(`/item/my-item/${id}`);
      setItem({
        ...itemRes.data,
      });

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
      {item ? (
        <>
          <ListingCard item={item} showBtn={false} />
          <Box>
            {item.requested_user.map((user) => (
              <RequestedUser
                {...user}
                timestamp={dayjs().to(user.timestamp).toString()}
                refresh={fetchItem}
              />
            ))}
          </Box>
        </>
      ) : (
        <Text color="gray.500" textAlign="center">
          Nothing yet
        </Text>
      )}
    </ScrollView>
  );
}
