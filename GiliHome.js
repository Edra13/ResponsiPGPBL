import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, RefreshControl, Image, ScrollView, Dimensions, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faPlane, faXmark } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleBooking = () => {
    Linking.openURL('https://www.traveloka.com');
  };
  
  const readFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites:', error.message);
    }
  };

  const removeFavorite = async (id) => {
    Alert.alert(
      "Delete Gili?",
      "Deleting this Gili might break its little island heart. Proceed with caution! 💔",
      [
        { text: "Keep It on List", style: "cancel" },
        {
          text: "Bye, Gili!",
          onPress: async () => {
            const newFavorites = favorites.filter((item) => item.id !== id);
            setFavorites(newFavorites);
            try {
              await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            } catch (error) {
              console.error("Error removing favorite:", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await readFavorites();
    setIsRefreshing(false);
  };

  useEffect(() => {
    readFavorites();
  }, []);

  return (
    <View style={styles.container}>
       <View style={styles.cardImageIntroContainer}>
        <Image 
            source={require('./node_modules/react-native/Libraries/NewAppScreen/components/cardimageintro.png')} 
            style={styles.cardImageIntro} 
          />
      </View>

      <Text style={styles.welcomeTitle}>Welcome to OTW Gili</Text>
      <Text style={styles.description}>The Gili Islands are a collection of small islands surrounding Lombok, Indonesia.
        Known for their white sandy beaches, crystal-clear waters, and lively marine life, the Gili’s are a must-visit tropical paradise.
        </Text>
      <Text style={styles.description}>Your island getaway is just a click away. Book your ticket now!</Text>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <FontAwesomeIcon icon={faPlane} size={20} color="#fff" />
        <Text style={styles.bookButtonText}>Book a Ticket</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <FontAwesomeIcon icon={faHeart} size={24} color="#cd571d" style={{marginRight: 8}}/>
        <Text style={styles.title}>Your Favorite Gili</Text>
      </View>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>No favorites yet! Start adding some 😊</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                style={styles.removeButton}
              >
                <FontAwesomeIcon icon={faXmark} size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  cardImageIntroContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  cardImageIntro: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 4,
    borderRadius: 25,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0477bf',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#3d3d3d',
    marginBottom: 7,
  },
  bookButton: {
    flexDirection: 'row',
    backgroundColor: '#0477bf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 0, // Hapus padding agar gambar memenuhi sisi kartu
    marginRight: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 120,
    height: 173,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',  // Buat gambar memenuhi lebar kartu
    height: 100,    // Atur tinggi gambar
    borderTopLeftRadius: 8,  // Sudut atas melengkung
    borderTopRightRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0477bf',
    textAlign: 'center',
    marginTop: 8,
  },
  removeButton: {
    backgroundColor: '#cd571d',
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0477bf',
    marginRight: 8, // Beri jarak antara teks dan ikon
  },
  icon: {
    marginLeft: 5,
  },
});

export default Home;
