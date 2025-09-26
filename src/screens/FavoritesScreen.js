import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

// Mock favorites data
const MOCK_FAVORITES = [
  {
    id: '1',
    title: 'Attack on Titan',
    image: 'https://via.placeholder.com/300x400/FF6B6B/white?text=AOT',
    genre: 'Action, Drama',
    rating: 9.0,
    watchProgress: 85, // percentage watched
  },
  {
    id: '2',
    title: 'Demon Slayer',
    image: 'https://via.placeholder.com/300x400/4ECDC4/white?text=DS',
    genre: 'Action, Supernatural',
    rating: 8.7,
    watchProgress: 100,
  },
  {
    id: '3',
    title: 'One Piece',
    image: 'https://via.placeholder.com/300x400/45B7D1/white?text=OP',
    genre: 'Adventure, Comedy',
    rating: 9.5,
    watchProgress: 45,
  },
  {
    id: '4',
    title: 'Jujutsu Kaisen',
    image: 'https://via.placeholder.com/300x400/96CEB4/white?text=JJK',
    genre: 'Action, School',
    rating: 8.6,
    watchProgress: 70,
  },
];

const FavoriteCard = ({ anime, onPress, onRemove }) => {
  return (
    <TouchableOpacity 
      style={styles.favoriteCard} 
      onPress={() => onPress(anime)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: anime.image }}
        style={styles.favoriteImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.cardGradient}
      >
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => onRemove(anime.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="heart" size={20} color="#FF6B6B" />
        </TouchableOpacity>
        
        <View style={styles.cardInfo}>
          <Text style={styles.favoriteTitle} numberOfLines={2}>
            {anime.title}
          </Text>
          <Text style={styles.favoriteGenre} numberOfLines={1}>
            {anime.genre}
          </Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${anime.watchProgress}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>{anime.watchProgress}%</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{anime.rating}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const handleAnimePress = (anime) => {
    navigation.navigate('AnimeDetail', { anime });
  };

  const handleRemoveFavorite = (animeId) => {
    setFavorites(favorites.filter(anime => anime.id !== animeId));
  };

  const renderFavoriteItem = ({ item }) => (
    <FavoriteCard 
      anime={item} 
      onPress={handleAnimePress}
      onRemove={handleRemoveFavorite}
    />
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color="#666" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding anime to your favorites by tapping the heart icon
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.exploreButtonText}>Explore Anime</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Favorites</Text>
            <Text style={styles.headerSubtitle}>{favorites.length} anime</Text>
          </View>
          
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 16,
    marginTop: 5,
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  favoriteCard: {
    width: ITEM_WIDTH,
    height: 280,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  favoriteImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'space-between',
    padding: 12,
  },
  removeButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  cardInfo: {
    justifyContent: 'flex-end',
  },
  favoriteTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  favoriteGenre: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});