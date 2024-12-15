import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/ListGili'; 
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [desc, setDesc] = useState('');
  const [descList, setDescList] = useState([]);  // List to store all descriptions
  const [selectedGili, setSelectedGili] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataGili, setDataGili] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedGiliName, setSelectedGiliName] = useState('');


  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataGili(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const selectItem = (item) => {
    setSelectedGili(item);
    setName(item.name);
    setLocation(item.location);
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    setDescList(item.descList || []); // Set the list of descriptions from the selected Gili
    setSelectedGiliName(item.name);
  };

  const submit = () => {
    const data = {
      name: name,
      location: location,
      latitude: latitude,
      longitude: longitude,
      descList: [...descList, desc],  // Add new description to the list
    };

    fetch(`http://10.0.2.2:3000/ListGili/${selectedGili.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        alert('Thank you for your feedback!');
        setDesc(''); // Clear input after submitting
        setDescList([...descList, desc]); // Update the descList state with the new description
        setRefresh(true);
      })
      .catch((error) => console.error(error));
  };

  const removeDescFromServer = (index) => {
    const updatedDescList = descList.filter((_, idx) => idx !== index);
  
    // Data yang diperbarui
    const updatedData = {
      ...selectedGili,
      descList: updatedDescList,
    };
  
    fetch(`http://10.0.2.2:3000/ListGili/${selectedGili.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then(() => {
        setDescList(updatedDescList);  // Update state setelah berhasil menghapus
        alert('Comment deleted');
      })
      .catch((error) => console.error('Error:', error));
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View>
        <View style={styles.form}>
        <Text style={styles.desccardtitle}>What people say about</Text>
        <Text style={styles.giliName}>{selectedGiliName || 'Choose a Gili'}</Text>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Tell us your opinion about this Gili!"
                value={desc}
                onChangeText={setDesc}
            />
            <TouchableOpacity style={styles.addButton} onPress={submit}>
                <FontAwesomeIcon icon={faPaperPlane} size={14} color="#fff" />
            </TouchableOpacity>
            </View>
        </View>

        <FlatList
        data={descList}
        renderItem={({ item, index }) => (
            <View style={styles.descCard}>
            <Text style={styles.descText}>{item}</Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeDescFromServer(index)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
            <Text style={styles.emptyMessage}>No comment yet</Text>
        }
        />
    </View>

    <View style={styles.devider}></View>

    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0477bf', marginLeft: 20 }}>
        Choose a Gili
        </Text>

    <FlatList
        style={{ flex: 1 }}
        data={dataGili}
        refreshing={refresh}
        onRefresh={() => setRefresh(!refresh)}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => selectItem(item)}>
            <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardtitle}>{item.name}</Text>
            </View>
        </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
        <View style={styles.devider}></View>
        )}
    />
    </SafeAreaView>

  );
  
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    marginBottom: 0,
  },
  giliName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cd571d',
    textAlign: 'center',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#0477bf',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0477bf',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  desccardtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0477bf',
    textAlign: 'center',
    marginTop: 5,
  },
  cardtitle: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#0477bf', 
    alignItems: 'center',
    textAlignVertical: 'center',
    marginLeft: 20,
  },
  cardImage: {
    width: 160,
    height: 80,
    borderRadius: 8,
  },
  devider: {
    height: 10,
    backgroundColor: '#f1f1f1',
  },
  descCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  descText: {
    flex: 1,
    fontSize: 14,
    color: '#9db480',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#cd571d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default Createdata;
