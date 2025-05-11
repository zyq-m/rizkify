import { useLocationStore } from '@/store/store';
import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import * as Loc from 'expo-location';

export default function Location() {
  const { setLocation, location } = useLocationStore();

  // Center map on the user's current location
  const goToUserLocation = async () => {
    try {
      // Request permission
      const { status } = await Loc.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to access your current location.',
        );
        return;
      }

      // Get current position
      const userLocation = await Loc.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      // Update location in store
      setLocation({ latitude, longitude });

      // Animate map to user location
      // mapRef.current?.animateToRegion(
      //   {
      //     latitude,
      //     longitude,
      //     latitudeDelta: 0.01,
      //     longitudeDelta: 0.01,
      //   },
      //   1000,
      // );
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location.');
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    goToUserLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <MapView
        showsUserLocation
        showsMyLocationButton
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 5.33659,
          longitude: 103.141998,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      >
        {location && (
          <Marker
            coordinate={{
              longitude: location.longitude,
              latitude: location.latitude,
            }}
          />
        )}
      </MapView> */}
    </SafeAreaView>
  );
}
