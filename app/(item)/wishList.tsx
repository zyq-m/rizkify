import CardItem from '@/components/CardItem';
import Toast from '@/components/Toast';
import { WishList } from '@/constants/type';
import api from '@/utils/axios';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, Text, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';

export default function RequestList() {
  const [item, setItem] = useState<WishList | null>(null);
  const isFocussed = useIsFocused();
  const toast = useToast();

  async function fetchItem() {
    try {
      const itemRes = await api.get('/favourite');
      setItem(itemRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFav(id: number) {
    try {
      const res = await api.delete(`/favourite/${id}`);
      fetchItem();
      toast.show({
        placement: 'top',
        render: () => (
          <Toast title="Success" desc={res.data.message} toast={toast} />
        ),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isFocussed && fetchItem();
  }, []);

  return (
    <ScrollView>
      {item?.favourite.length ? (
        <VStack safeAreaX={2} space={2} mb="4">
          {item?.favourite.map((item) => (
            <CardItem
              key={item.id}
              {...item.item}
              onFav={() => removeFav(item.id)}
            />
          ))}
        </VStack>
      ) : (
        <Text color="gray.500" textAlign="center">
          Nothing yet
        </Text>
      )}
    </ScrollView>
  );
}
