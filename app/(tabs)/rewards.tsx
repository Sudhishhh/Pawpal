import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Award, Gift } from 'lucide-react-native';

export default function RewardsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Impact</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Animals Fed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Medical Assists</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Adoptions</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesContainer}>
          {[1, 2, 3].map((badge) => (
            <View key={badge} style={styles.badge}>
              <Award size={32} color="#FF6B6B" />
              <Text style={styles.badgeTitle}>Super Helper</Text>
              <Text style={styles.badgeDesc}>Fed 20+ animals</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        {[1, 2].map((reward) => (
          <TouchableOpacity key={reward} style={styles.rewardCard}>
            <Gift size={24} color="#FF6B6B" />
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>20% Off Pet Food</Text>
              <Text style={styles.rewardDesc}>Valid at PetSmart stores</Text>
            </View>
            <TouchableOpacity style={styles.claimButton}>
              <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 15,
  },
  badgesContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  badge: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 10,
  },
  badgeDesc: {
    fontSize: 12,
    color: '#718096',
    marginTop: 5,
    textAlign: 'center',
  },
  rewardCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rewardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  rewardDesc: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  claimButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  claimButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});