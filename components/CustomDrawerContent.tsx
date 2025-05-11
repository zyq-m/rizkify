import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar } from 'native-base';
import { User } from '@/constants/type';
import api, { BASE_URL } from '@/utils/axios';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    api
      .get('/profile')
      .then((res) => setUser(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.profileSection}>
        <Avatar source={{ uri: `${BASE_URL}/${user?.avatar}` }} size="lg">
          {user ? user.name?.slice(0, 2) : 'User'}
        </Avatar>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileDetails: {
    marginLeft: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
