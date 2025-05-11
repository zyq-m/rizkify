import ListingCard from '@/components/ListingCard';
import { ItemT } from '@/constants/type';
import api from '@/utils/axios';
import { useIsFocused } from '@react-navigation/native';
import { Box, FlatList, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';

export default function Listing() {
  const [items, setItems] = useState<ItemT[]>([]);
  const isFocused = useIsFocused();

  const fetchItems = async () => {
    try {
      const itemRes = await api.get('/item/my-item');
      setItems(itemRes.data);
    } catch (error) {
      // do popup
      console.log(error);
    }
  };

  useEffect(() => {
    isFocused && fetchItems();
  }, [isFocused]);

  return (
    <Box safeAreaX={2}>
      <ScrollView>
        <VStack space={2} mb="4">
          {items.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </VStack>
        {!items.length && (
          <Text color="gray.500" textAlign="center">
            Nothing yet
          </Text>
        )}
      </ScrollView>
    </Box>
  );
}
