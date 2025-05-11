import { Drawer } from 'expo-router/drawer';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StackHeader from '@/components/StackHeader';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function AppLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (header) => <StackHeader {...header} menu={true} />,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          drawerIcon: () => (
            <MaterialIcons name="home" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="listing"
        options={{
          title: 'My Listings',
          drawerIcon: () => (
            <MaterialIcons name="list" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="nearMe"
        options={{
          title: 'Near me',
          drawerIcon: () => (
            <MaterialIcons name="near-me" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="helpCentre"
        options={{
          title: 'Guidelines',
          drawerIcon: () => (
            <AntDesign name="customerservice" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="aboutUs"
        options={{
          title: 'About Us',
          drawerIcon: () => (
            <MaterialIcons name="info-outline" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="termCondition"
        options={{
          title: 'Terms & conditions',
          drawerIcon: () => (
            <FontAwesome5 name="shield-alt" size={24} color="black" />
          ),
        }}
      />
    </Drawer>
  );
}
