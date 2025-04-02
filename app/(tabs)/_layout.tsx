import { Tabs } from 'expo-router';
import { PawPrint as Paw, Map, Heart, Trophy, User, Banknote } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

function TabBarIcon({ color, size, icon: Icon }) {
  return (
    <View style={styles.iconContainer}>
      <Icon size={size} color={color} />
    </View>
  );
}

function LogoTitle() {
  return (
    <View style={styles.logoContainer}>
      <Paw size={24} color="#FF6B6B" />
      <Text style={styles.logoText}>PawPal</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <LogoTitle />,
        headerStyle: {
          backgroundColor: '#FFF',
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#4A4A4A',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#FFE5E5',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Paw} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Map} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="adopt"
        options={{
          title: 'Adopt',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Heart} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="donation"
        options={{
          title: 'Donate',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Banknote} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Trophy} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={User} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
});