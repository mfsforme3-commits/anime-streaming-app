import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_USER_DATA = {
  name: 'Anime Fan',
  email: 'animefan@example.com',
  joinDate: 'January 2023',
  watchedAnime: 47,
  favoriteAnime: 12,
  watchTime: '156 hours',
};

const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, showChevron = true }) => {
  return (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon} size={20} color="#FF6B6B" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <View style={styles.settingRight}>
        {rightComponent}
        {showChevron && onPress && (
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
};

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleWatchHistory = () => {
    Alert.alert('Watch History', 'Watch history feature coming soon!');
  };

  const handleDownloads = () => {
    Alert.alert('Downloads', 'Downloads feature coming soon!');
  };

  const handleLanguageSettings = () => {
    Alert.alert('Language Settings', 'Language settings coming soon!');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Help center coming soon!');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy coming soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        style={styles.profileHeader}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{MOCK_USER_DATA.name}</Text>
            <Text style={styles.userEmail}>{MOCK_USER_DATA.email}</Text>
            <Text style={styles.joinDate}>Member since {MOCK_USER_DATA.joinDate}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatCard 
          icon="tv" 
          title="Watched" 
          value={MOCK_USER_DATA.watchedAnime}
          color="#4ECDC4"
        />
        <StatCard 
          icon="heart" 
          title="Favorites" 
          value={MOCK_USER_DATA.favoriteAnime}
          color="#FF6B6B"
        />
        <StatCard 
          icon="time" 
          title="Watch Time" 
          value={MOCK_USER_DATA.watchTime}
          color="#45B7D1"
        />
      </View>

      {/* Settings Sections */}
      <View style={styles.settingsContainer}>
        {/* Account Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <SettingItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={handleEditProfile}
          />
          
          <SettingItem
            icon="time-outline"
            title="Watch History"
            subtitle="View your recently watched anime"
            onPress={handleWatchHistory}
          />
          
          <SettingItem
            icon="download-outline"
            title="Downloads"
            subtitle="Manage offline content"
            onPress={handleDownloads}
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Episode updates and recommendations"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#333', true: '#FF6B6B' }}
                thumbColor={notificationsEnabled ? '#fff' : '#666'}
              />
            }
            showChevron={false}
          />
          
          <SettingItem
            icon="play-outline"
            title="Auto-play Next Episode"
            subtitle="Automatically play the next episode"
            rightComponent={
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: '#333', true: '#FF6B6B' }}
                thumbColor={autoPlay ? '#fff' : '#666'}
              />
            }
            showChevron={false}
          />
          
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Use dark theme"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#333', true: '#FF6B6B' }}
                thumbColor={darkMode ? '#fff' : '#666'}
              />
            }
            showChevron={false}
          />
          
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            onPress={handleLanguageSettings}
          />
        </View>

        {/* Support Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="FAQs and contact support"
            onPress={handleHelp}
          />
          
          <SettingItem
            icon="shield-outline"
            title="Privacy Policy"
            subtitle="Learn about your privacy"
            onPress={handlePrivacy}
          />
        </View>

        {/* Logout */}
        <View style={styles.settingsSection}>
          <SettingItem
            icon="log-out-outline"
            title="Logout"
            onPress={handleLogout}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  profileHeader: {
    padding: 20,
    paddingTop: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 4,
  },
  joinDate: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  settingsContainer: {
    padding: 20,
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});