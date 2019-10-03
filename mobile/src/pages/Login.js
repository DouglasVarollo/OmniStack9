import React, {useState, useEffect} from 'react';
import {
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List');
      }
    });
  });

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email,
    });

    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    alignSelf: 'stretch',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  label: {
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
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
