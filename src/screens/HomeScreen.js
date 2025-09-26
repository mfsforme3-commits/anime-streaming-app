import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

// Mock data for demonstration
const MOCK_ANIME_DATA = [
  {
    id: '1',
    title: 'Attack on Titan',
    image: 'https://via.placeholder.com/300x400/FF6B6B/white?text=AOT',
    genre: 'Action, Drama',
    rating: 9.0,
    year: 2023,
  },
  {
    id: '2',
    title: 'Demon Slayer',
    image: 'https://via.placeholder.com/300x400/4ECDC4/white?text=DS',
    genre: 'Action, Supernatural',
    rating: 8.7,
    year: 2023,
  },
  {
    id: '3',
    title: 'One Piece',
    image: 'https://via.placeholder.com/300x400/45B7D1/white?text=OP',
    genre: 'Adventure, Comedy',
    rating: 9.5,
    year: 2023,
  },
  {
    id: '4',
    title: 'Jujutsu Kaisen',
    image: 'https://via.placeholder.com/300x400/96CEB4/white?text=JJK',
    genre: 'Action, School',
    rating: 8.6,
    year: 2023,
  },
  {
    id: '5',
    title: 'My Hero Academia',
    image: 'https://via.placeholder.com/300x400/FFEAA7/black?text=MHA',
    genre: 'Action, School, Superhero',
    rating: 8.4,
    year: 2023,
  },
  {
    id: '6',
    title: 'Naruto',
    image: 'https://via.placeholder.com/300x400/DDA0DD/black?text=Naruto',
    genre: 'Action, Adventure',
    rating: 8.8,
    year: 2023,
  },
];

const FEATURED_ANIME = {
  id: 'featured',
  title: 'Chainsaw Man',
  description: 'Follow Denji as he becomes the Chainsaw Devil Hunter in this dark supernatural action series.',
  image: 'https://via.placeholder.com/400x600/FF6B6B/white?text=Chainsaw+Man',
  genre: 'Action, Supernatural, Gore',
  rating: 9.2,
  episodes: 12,
};

const AnimeCard = ({ anime, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.animeCard} 
      onPress={() => onPress(anime)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: anime.image }}
        style={styles.animeImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.cardGradient}
      >
        <View style={styles.cardInfo}>
          <Text style={styles.animeTitle} numberOfLines={2}>
            {anime.title}
          </Text>
          <Text style={styles.animeGenre} numberOfLines={1}>
            {anime.genre}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{anime.rating}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const FeaturedSection = ({ anime, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.featuredContainer}
      onPress={() => onPress(anime)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: anime.image }}
        style={styles.featuredBackground}
        imageStyle={styles.featuredBackgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredLabel}>Featured Anime</Text>
            <Text style={styles.featuredTitle}>{anime.title}</Text>
            <Text style={styles.featuredDescription} numberOfLines={3}>
              {anime.description}
            </Text>
            <View style={styles.featuredStats}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.statText}>{anime.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="tv" size={16} color="#FF6B6B" />
                <Text style={styles.statText}>{anime.episodes} Episodes</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={20} color="#fff" />
              <Text style={styles.playButtonText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [animeList, setAnimeList] = useState(MOCK_ANIME_DATA);
  const [featuredAnime] = useState(FEATURED_ANIME);

  const handleAnimePress = (anime) => {
    navigation.navigate('AnimeDetail', { anime });
  };

  const renderAnimeItem = ({ item }) => (
    <AnimeCard anime={item} onPress={handleAnimePress} />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Featured Section */}
      <FeaturedSection anime={featuredAnime} onPress={handleAnimePress} />
      
      {/* Popular Anime Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Anime</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={animeList}
          renderItem={renderAnimeItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  featuredContainer: {
    height: 300,
    marginBottom: 20,
  },
  featuredBackground: {
    flex: 1,
  },
  featuredBackgroundImage: {
    borderRadius: 0,
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 20,
  },
  featuredLabel: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuredDescription: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  featuredStats: {
    flexDirection: 'row',
    marginBottom: 15,
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
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  animeCard: {
    width: ITEM_WIDTH,
    height: 240,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  animeImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  cardInfo: {
    padding: 12,
  },
  animeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  animeGenre: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});