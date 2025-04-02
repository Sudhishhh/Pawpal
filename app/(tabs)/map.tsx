import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import * as Location from 'expo-location';

// Conditionally import MapView and Marker
let MapView: any;
let Marker: any;

// Only import react-native-maps on native platforms
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function MapScreen() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  // Render a web-specific view when on web platform
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.webPlaceholder}>
          <Text style={styles.webTitle}>Map View</Text>
          <Text style={styles.webText}>
            The interactive map is available on mobile devices.
          </Text>
          <Text style={styles.webCoords}>
            Current Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Text>
        </View>
      </View>
    );
  }

  // Render the native map view on mobile platforms
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location}
        showsUserLocation
        showsMyLocationButton>
        <Marker
          coordinate={{
            latitude: location.latitude + 0.01,
            longitude: location.longitude + 0.01,
          }}
          title="Feeding Location"
          description="Daily feeding spot at 6 PM"
        />
        <Marker
          coordinate={{
            latitude: location.latitude - 0.01,
            longitude: location.longitude - 0.01,
          }}
          title="Medical Case"
          description="Injured cat needs attention"
          pinColor="red"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webPlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  webTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  webText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  webCoords: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
});