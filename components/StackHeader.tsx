import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HStack, Icon, IconButton, Text } from 'native-base';
import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/src/types';
import { DrawerHeaderProps } from '@react-navigation/drawer/src/types';

export default function StackHeader({
  options: { title },
  navigation,
  menu,
}: (NativeStackHeaderProps | DrawerHeaderProps) & { menu?: boolean }) {
  return (
    <HStack
      safeAreaTop
      bgColor="primary.500"
      bg="#03402F"
      alignItems="center"
      space="6"
      py="3"
    >
      <IconButton
        icon={
          menu ? (
            <Icon as={MaterialIcons} name="menu" size="lg" color="white" />
          ) : (
            <Icon as={Ionicons} name="chevron-back" size="lg" color="white" />
          )
        }
        onPress={() => (menu ? navigation.openDrawer() : navigation.goBack())}
      />
      <Text color="white" fontWeight="semibold" fontSize="lg">
        {title}
      </Text>
    </HStack>
  );
}
