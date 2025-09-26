import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 3;

// Mock search results
const MOCK_SEARCH_RESULTS = [
  {
    id: '1',
    title: 'Attack on Titan',
    image: 'https://via.placeholder.com/200x300/FF6B6B/white?text=AOT',
    genre: 'Action, Drama',
    rating: 9.0,
    year: 2023,
  },
  {
    id: '2',
    title: 'Demon Slayer',
    image: 'https://via.placeholder.com/200x300/4ECDC4/white?text=DS',
    genre: 'Action, Supernatural',
    rating: 8.7,
    year: 2023,
  },
  {
    id: '3',
    title: 'One Piece',
    image: 'https://via.placeholder.com/200x300/45B7D1/white?text=OP',
    genre: 'Adventure, Comedy',
    rating: 9.5,
    year: 2023,
  },
  {
    id: '4',
    title: 'Jujutsu Kaisen',
    image: 'https://via.placeholder.com/200x300/96CEB4/white?text=JJK',
    genre: 'Action, School',
    rating: 8.6,
    year: 2023,
  },
  {
    id: '5',
    title: 'My Hero Academia',
    image: 'https://via.placeholder.com/200x300/FFEAA7/black?text=MHA',
    genre: 'Action, School, Superhero',
    rating: 8.4,
    year: 2023,
  },
  {
    id: '6',
    title: 'Naruto',
    image: 'https://via.placeholder.com/200x300/DDA0DD/black?text=Naruto',
    genre: 'Action, Adventure',
    rating: 8.8,
    year: 2023,
  },
];

const POPULAR_SEARCHES = [
  'Attack on Titan',
  'Demon Slayer',
  'One Piece',
  'Jujutsu Kaisen',
  'My Hero Academia',
  'Death Note',
  'Naruto',
  'Dragon Ball Z',
];

const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Horror',
  'Slice of Life',
];

const SearchResultCard = ({ anime, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.resultCard} 
      onPress={() => onPress(anime)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: anime.image }}
        style={styles.resultImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.resultGradient}
      >
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle} numberOfLines={2}>
            {anime.title}
          </Text>
          <View style={styles.resultRating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{anime.rating}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const PopularSearchItem = ({ search, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.popularItem}
      onPress={() => onPress(search)}
      activeOpacity={0.7}
    >
      <Ionicons name="trending-up" size={16} color="#FF6B6B" />
      <Text style={styles.popularText}>{search}</Text>
      <Ionicons name="chevron-forward" size={16} color="#666" />
    </TouchableOpacity>
  );
};

const GenreChip = ({ genre, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.genreChip, isSelected && styles.selectedGenreChip]}
      onPress={() => onPress(genre)}
      activeOpacity={0.7}
    >
      <Text style={[styles.genreText, isSelected && styles.selectedGenreText]}>
        {genre}
      </Text>
    </TouchableOpacity>
  );
};

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch();
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = MOCK_SEARCH_RESULTS.filter(anime =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
      setIsLoading(false);
    }, 500);
  };

  const handleAnimePress = (anime) => {
    navigation.navigate('AnimeDetail', { anime });
  };

  const handlePopularSearch = (search) => {
    setSearchQuery(search);
  };

  const handleGenrePress = (genre) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newSelectedGenres);
  };

  const renderSearchResult = ({ item }) => (
    <SearchResultCard anime={item} onPress={handleAnimePress} />
  );

  const renderPopularSearch = ({ item }) => (
    <PopularSearchItem search={item} onPress={handlePopularSearch} />
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search anime..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results or Default Content */}
      {showResults ? (
        <View style={styles.resultsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.resultsHeader}>
                {searchResults.length} results for "{searchQuery}"
              </Text>
              <FlatList
                data={searchResults}
                renderItem={renderSearchResult}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={styles.resultsRow}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.resultsList}
              />
            </>
          )}
        </View>
      ) : (
        <View style={styles.defaultContent}>
          {/* Genre Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.genresContainer}>
              {GENRES.map((genre) => (
                <GenreChip
                  key={genre}
                  genre={genre}
                  isSelected={selectedGenres.includes(genre)}
                  onPress={handleGenrePress}
                />
              ))}
            </View>
          </View>

          {/* Popular Searches */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <FlatList
              data={POPULAR_SEARCHES}
              renderItem={renderPopularSearch}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  searchHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  resultsHeader: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
  },
  resultsRow: {
    justifyContent: 'space-between',
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultCard: {
    width: ITEM_WIDTH,
    height: 160,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  resultGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  resultInfo: {
    padding: 8,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 11,
  },
  defaultContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genreChip: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedGenreChip: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  genreText: {
    color: '#ccc',
    fontSize: 14,
  },
  selectedGenreText: {
    color: '#fff',
    fontWeight: '600',
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  popularText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
});