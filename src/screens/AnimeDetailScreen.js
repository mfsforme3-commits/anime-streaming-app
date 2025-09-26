import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Mock episodes data
const MOCK_EPISODES = [
  { id: '1', title: 'The Beginning', duration: '24:30', thumbnail: 'https://via.placeholder.com/160x90/FF6B6B/white?text=EP1' },
  { id: '2', title: 'First Battle', duration: '23:45', thumbnail: 'https://via.placeholder.com/160x90/4ECDC4/white?text=EP2' },
  { id: '3', title: 'New Powers', duration: '24:15', thumbnail: 'https://via.placeholder.com/160x90/45B7D1/white?text=EP3' },
  { id: '4', title: 'The Training', duration: '25:00', thumbnail: 'https://via.placeholder.com/160x90/96CEB4/white?text=EP4' },
];

const SIMILAR_ANIME = [
  { id: '1', title: 'Similar Anime 1', image: 'https://via.placeholder.com/120x160/FF6B6B/white?text=S1' },
  { id: '2', title: 'Similar Anime 2', image: 'https://via.placeholder.com/120x160/4ECDC4/white?text=S2' },
  { id: '3', title: 'Similar Anime 3', image: 'https://via.placeholder.com/120x160/45B7D1/white?text=S3' },
];

const EpisodeCard = ({ episode, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.episodeCard}
      onPress={() => onPress(episode)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: episode.thumbnail }}
        style={styles.episodeThumbnail}
        contentFit="cover"
      />
      <View style={styles.episodeOverlay}>
        <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
      </View>
      <View style={styles.episodeInfo}>
        <Text style={styles.episodeTitle} numberOfLines={1}>
          Episode {episode.id}: {episode.title}
        </Text>
        <Text style={styles.episodeDuration}>{episode.duration}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SimilarAnimeCard = ({ anime, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.similarCard}
      onPress={() => onPress(anime)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: anime.image }}
        style={styles.similarImage}
        contentFit="cover"
      />
      <Text style={styles.similarTitle} numberOfLines={2}>
        {anime.title}
      </Text>
    </TouchableOpacity>
  );
};

export default function AnimeDetailScreen({ route, navigation }) {
  const { anime } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('episodes'); // 'episodes' or 'info'

  const handlePlayEpisode = (episode) => {
    navigation.navigate('VideoPlayer', { anime, episode });
  };

  const handleSimilarAnimePress = (similarAnime) => {
    navigation.push('AnimeDetail', { anime: similarAnime });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: anime.image }}
          style={styles.heroBackground}
          imageStyle={styles.heroBackgroundImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.posterContainer}>
                <Image
                  source={{ uri: anime.image }}
                  style={styles.posterImage}
                  contentFit="cover"
                />
              </View>
              
              <View style={styles.heroInfo}>
                <Text style={styles.animeTitle}>{anime.title}</Text>
                <Text style={styles.animeGenre}>{anime.genre}</Text>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.statText}>{anime.rating}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="calendar" size={16} color="#FF6B6B" />
                    <Text style={styles.statText}>{anime.year}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="tv" size={16} color="#4ECDC4" />
                    <Text style={styles.statText}>12 Episodes</Text>
                  </View>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.playButton}
                    onPress={() => handlePlayEpisode(MOCK_EPISODES[0])}
                  >
                    <Ionicons name="play" size={20} color="#fff" />
                    <Text style={styles.playButtonText}>Watch Now</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={toggleFavorite}
                  >
                    <Ionicons 
                      name={isFavorite ? "heart" : "heart-outline"} 
                      size={20} 
                      color={isFavorite ? "#FF6B6B" : "#fff"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'episodes' && styles.activeTab]}
          onPress={() => setSelectedTab('episodes')}
        >
          <Text style={[styles.tabText, selectedTab === 'episodes' && styles.activeTabText]}>
            Episodes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'info' && styles.activeTab]}
          onPress={() => setSelectedTab('info')}
        >
          <Text style={[styles.tabText, selectedTab === 'info' && styles.activeTabText]}>
            Information
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      <View style={styles.content}>
        {selectedTab === 'episodes' ? (
          <View style={styles.episodesSection}>
            <Text style={styles.sectionTitle}>Episodes</Text>
            {MOCK_EPISODES.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onPress={handlePlayEpisode}
              />
            ))}
          </View>
        ) : (
          <View style={styles.infoSection}>
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Synopsis</Text>
              <Text style={styles.description}>
                {anime.description || 
                  "This anime follows an incredible journey filled with action, adventure, and unforgettable characters. Experience a story that will keep you on the edge of your seat with amazing plot twists and character development."}
              </Text>
            </View>
            
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>Completed</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Studios:</Text>
                <Text style={styles.detailValue}>Studio Pierrot</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>24 min per episode</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Source:</Text>
                <Text style={styles.detailValue}>Manga</Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Similar Anime Section */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Anime</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarList}
          >
            {SIMILAR_ANIME.map((similarAnime) => (
              <SimilarAnimeCard
                key={similarAnime.id}
                anime={similarAnime}
                onPress={handleSimilarAnimePress}
              />
            ))}
          </ScrollView>
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
  heroContainer: {
    height: 400,
  },
  heroBackground: {
    flex: 1,
  },
  heroBackgroundImage: {
    opacity: 0.5,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroContent: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30,
  },
  posterContainer: {
    marginRight: 20,
  },
  posterImage: {
    width: 120,
    height: 160,
    borderRadius: 12,
  },
  heroInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  animeTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  animeGenre: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  episodesSection: {
    marginBottom: 30,
  },
  episodeCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  episodeThumbnail: {
    width: 160,
    height: 90,
  },
  episodeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 160,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  episodeInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  episodeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  episodeDuration: {
    color: '#666',
    fontSize: 14,
  },
  infoSection: {
    marginBottom: 30,
  },
  descriptionSection: {
    marginBottom: 30,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  detailsSection: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailLabel: {
    color: '#666',
    fontSize: 16,
    width: 100,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  similarSection: {
    marginBottom: 20,
  },
  similarList: {
    paddingRight: 20,
  },
  similarCard: {
    marginRight: 15,
    width: 120,
  },
  similarImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});