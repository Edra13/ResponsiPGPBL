import React, { useState, useEffect } from 'react';
import DataGili from './data/ListGili.json';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ListGili = () => {
  const [favorites, setFavorites] = useState([]);

  // Membaca data favorit dari AsyncStorage
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

  // Menambahkan item ke favorit
  const addFavorite = async (item) => {
    try {
      // Memastikan id item adalah unik dan valid
      const alreadyFavorite = favorites.some(fav => fav.id === item.id);
      if (alreadyFavorite) {
        Alert.alert('Warning', `${item.name} is already in favorites!`);
        return;  // Jika sudah ada di favorit, jangan menambahkannya lagi
      }
  
      // Jika belum ada, tambahkan ke favorit
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      Alert.alert('Success', `${item.name} added to favorites!`);
    } catch (error) {
      console.error('Error adding favorite:', error.message);
    }
  };
  

  useEffect(() => {
    readFavorites();
  }, []);

  return (
    <FlatList
      data={DataGili}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => Linking.openURL(`google.navigation:q=${item.latitude},${item.longitude}`)}
        >
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardtitle}>{item.name}</Text>
              <Text><Text style={styles.boldText}>Location: </Text>{item.location}</Text>
              <Text><Text style={styles.boldText}>Distance from airport: </Text>{item.distance}</Text>
              <Text><Text style={styles.boldText}>Popular: </Text>{item.populars}</Text>
              <Text><Text style={styles.boldText}>Spots: </Text>{item.spots}</Text>
  
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => addFavorite(item)}
                  style={styles.favoriteButton}
                >
                  <Text style={styles.favoriteButtonText}>Add to Favorite</Text>
                  <FontAwesomeIcon icon={faHeart} size={20} color="#fff" style={styles.heartIcon} />
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.link)}
                  style={styles.seeMoreButton}
                >
                  <Text style={styles.seeMoreButtonText}>See More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 190,
    borderRadius: 10,
  },
  cardtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0477bf',
    marginBottom: 7,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#cd571d',
  },
  cardInfo: {
    paddingLeft: 15,
    paddingVertical: 12,
    fontSize: 12,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 15,
    justifyContent: 'flex-end',
  },
  favoriteButton: {
    backgroundColor: '#9db480',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    marginRight: 10,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 8,
  },
  heartIcon: {
    marginLeft: 0,
    marginRight: 3,
  },
  seeMoreButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
  },
  seeMoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ListGili;
