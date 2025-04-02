import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const SAMPLE_PETS = [
  {
    id: '1',
    name: 'Luna',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&h=400',
    age: '1 year',
    location: 'Downtown',
  },
  {
    id: '2',
    name: 'Max',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&h=400',
    age: '6 months',
    location: 'Westside',
  },
];

export default function AdoptScreen() {
  const renderPet = ({ item }) => (
    <TouchableOpacity style={styles.petCard}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petDetails}>{item.age} • {item.location}</Text>
      </View>
      <TouchableOpacity style={styles.adoptButton}>
        <Text style={styles.adoptButtonText}>Adopt Me</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your New Best Friend</Text>
      <FlatList
        data={SAMPLE_PETS}
        renderItem={renderPet}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petImage: {
    width: '100%',
    height: 200,
  },
  petInfo: {
    padding: 15,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  petDetails: {
    fontSize: 14,
    color: '#718096',
    marginTop: 5,
  },
  adoptButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});