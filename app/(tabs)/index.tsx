import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Camera as CameraIcon, Camera as FlipCamera, Timer, X } from 'lucide-react-native';
import { CameraView, CameraType } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { manipulateAsync } from 'expo-image-manipulator';

const TOP_USERS = [
  {
    id: '1',
    name: 'Emma Wilson',
    points: 2840,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100',
    badge: 'Animal Guardian',
    rank: 1,
  },
  {
    id: '2',
    name: 'Michael Chen',
    points: 2456,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
    badge: 'Rescue Hero',
    rank: 2,
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    points: 2198,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
    badge: 'Compassion Star',
    rank: 3,
  },
];

export default function ReportScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const cameraRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Text style={styles.description}>
          We need camera access to help you report stray animals.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => requestPermission()}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startCountdown = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((current) => {
        if (current === 1) {
          clearInterval(interval);
          takePicture();
          return null;
        }
        return current - 1;
      });
    }, 1000);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      const processedPhoto = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.7, format: 'jpeg' }
      );
      setPhoto(processedPhoto.uri);
    } catch (error) {
      console.error('Failed to take picture:', error);
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const resetCamera = () => {
    setPhoto(null);
    setCountdown(null);
    setIsRecording(false);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CameraIcon size={24} color="#FFD700" />;
      case 2:
        return <CameraIcon size={24} color="#C0C0C0" />;
      case 3:
        return <CameraIcon size={24} color="#CD7F32" />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report a Stray Animal</Text>
        
        {!photo ? (
          <View style={styles.cameraContainer}>
            <CameraView 
              ref={cameraRef}
              style={styles.camera}
              type={cameraType}
            >
              {countdown !== null && (
                <View style={styles.countdownOverlay}>
                  <Text style={styles.countdownText}>{countdown}</Text>
                </View>
              )}
              
              <View style={styles.cameraControls}>
                <TouchableOpacity 
                  style={styles.cameraButton} 
                  onPress={toggleCameraType}
                >
                  <FlipCamera size={24} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.captureButton, isRecording && styles.recordingButton]}
                  onPress={() => startCountdown()}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.cameraButton}
                  onPress={() => startCountdown()}
                >
                  <Timer size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={resetCamera}
            >
              <X size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.reportContainer}>
              <Text style={styles.subtitle}>Select Report Type:</Text>
              
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>🍽️ Feeding Location</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>🏥 Medical Assistance</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>💝 Up for Adoption</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Top Animal Heroes</Text>
        <Text style={styles.leaderboardSubtitle}>Making a difference in their community</Text>
        
        {TOP_USERS.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userRank}>
              {getRankIcon(user.rank)}
            </View>
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userBadge}>{user.badge}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.points}>{user.points}</Text>
              <Text style={styles.pointsLabel}>pts</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View Full Leaderboard</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    height: 500,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B6B',
    padding: 3,
  },
  captureButtonInner: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  recordingButton: {
    backgroundColor: '#FF4444',
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 120,
    color: '#FFF',
    fontWeight: 'bold',
  },
  previewContainer: {
    height: 500,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 20,
  },
  reportButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportButtonText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  leaderboardContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  leaderboardSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  userRank: {
    width: 40,
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  userBadge: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#718096',
  },
  viewAllButton: {
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllText: {
    color: '#4A5568',
    fontSize: 14,
    fontWeight: '600',
  },
});