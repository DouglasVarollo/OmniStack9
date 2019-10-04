import React, {useState, useEffect} from 'react';
import {withNavigation} from 'react-navigation';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import api from '../services/api';

function SpotList({tech, navigation}) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: {
          tech,
        },
      });

      setSpots(response.data);
    }

    loadSpots();
  });

  function handleNavigation(id) {
    navigation.navigate('Book', {id});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>
      </Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{
                uri: item.thumbnail_url.replace('localhost', '192.168.1.5'),
              }}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `R$${item.price}/dia` : 'GRATUITO'}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigation(item._id)}
              style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    marginBottom: 15,
    paddingHorizontal: 20,
    color: '#444',
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    borderRadius: 2,
    resizeMode: 'contain',
  },
  company: {
    marginTop: 10,
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 5,
    color: '#999',
    fontSize: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    marginTop: 15,
    borderRadius: 2,
    backgroundColor: '#F0545B',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default withNavigation(SpotList);
