import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import api from '../services/api';

export default function Book({navigation}) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {date}, {headers: {user_id}});

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    marginTop: 30,
    marginBottom: 8,
    color: '#444',
    fontWeight: 'bold',
  },
  input: {
    height: 44,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 2,
    color: '#444',
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 2,
    backgroundColor: '#F0545B',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
