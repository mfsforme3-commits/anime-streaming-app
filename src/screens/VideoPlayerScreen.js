import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get('window');

// Mock video URL (you would replace this with actual anime episode URLs)
const MOCK_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoPlayerScreen({ route, navigation }) {
  const { anime, episode } = route.params;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeout = useRef(null);

  useEffect(() => {
    // Set to landscape mode when component mounts
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Handle back button on Android
    const backAction = () => {
      handleGoBack();
      return true;
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    return () => {
      // Reset to portrait when component unmounts
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (isControlsVisible) {
      controlsTimeout.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    }
    
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isControlsVisible]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const togglePlayPause = () => {
    if (status.isLoaded) {
      if (status.isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
    }
  };

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleScreenPress = () => {
    setIsControlsVisible(!isControlsVisible);
  };

  const handleSeek = (value) => {
    if (status.isLoaded && duration > 0) {
      const seekTime = (value / 100) * duration;
      videoRef.current.setPositionAsync(seekTime);
    }
  };

  const formatTime = (timeInMillis) => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      
      <TouchableOpacity 
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={handleScreenPress}
      >
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: MOCK_VIDEO_URL }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={(playbackStatus) => {
            setStatus(playbackStatus);
            if (playbackStatus.isLoaded) {
              setCurrentTime(playbackStatus.positionMillis || 0);
              setDuration(playbackStatus.durationMillis || 0);
            }
          }}
        />
        
        {/* Video Controls Overlay */}
        {isControlsVisible && (
          <View style={styles.controlsOverlay}>
            {/* Top Controls */}
            <View style={styles.topControls}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleGoBack}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              <View style={styles.titleContainer}>
                <Text style={styles.animeTitle} numberOfLines={1}>
                  {anime.title}
                </Text>
                <Text style={styles.episodeTitle} numberOfLines={1}>
                  Episode {episode.id}: {episode.title}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.settingsButton}>
                <Ionicons name="settings-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Center Play/Pause Button */}
            <View style={styles.centerControls}>
              <TouchableOpacity 
                style={styles.playPauseButton}
                onPress={togglePlayPause}
              >
                <Ionicons 
                  name={status.isPlaying ? 'pause' : 'play'} 
                  size={50} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </View>
            
            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <Text style={styles.timeText}>
                {formatTime(currentTime)}
              </Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${progressPercentage}%` }]} 
                  />
                  <TouchableOpacity 
                    style={[styles.progressHandle, { left: `${progressPercentage}%` }]}
                    // You can add drag functionality here
                  />
                </View>
              </View>
              
              <Text style={styles.timeText}>
                {formatTime(duration)}
              </Text>
              
              <TouchableOpacity 
                style={styles.fullscreenButton}
                onPress={toggleFullscreen}
              >
                <Ionicons 
                  name={isFullscreen ? 'contract-outline' : 'expand-outline'} 
                  size={20} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Loading Indicator */}
        {!status.isLoaded && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {/* Next Episode Button */}
      {isControlsVisible && (
        <View style={styles.nextEpisodeContainer}>
          <TouchableOpacity 
            style={styles.nextEpisodeButton}
            onPress={() => {
              // Handle next episode logic
            }}
          >
            <Ionicons name="play-skip-forward" size={20} color="#fff" />
            <Text style={styles.nextEpisodeText}>Next Episode</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  animeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  settingsButton: {
    padding: 10,
    marginLeft: 15,
  },
  centerControls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 15,
    height: 20,
    justifyContent: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  progressHandle: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    marginLeft: -8,
  },
  fullscreenButton: {
    padding: 10,
    marginLeft: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  nextEpisodeContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  nextEpisodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextEpisodeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});