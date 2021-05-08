import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function HomeScreen(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) props.navigation.navigate('Login');

    const decoded = jwtDecode(token);
    setFullName(decoded.fullName);
    setEmail(decoded.email);
  }

  const logout = (props) => {
    AsyncStorage.removeItem('token')
      .then(() => {
        props.navigation.replace('Login');
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadProfile();
  });

  return (
    <View>
      <View>
        <Text>Welcome { fullName }</Text>
      </View>
      <View>
        <Text>Your email: { email }</Text>
      </View>
      <View>
        <Button
          title="Logout"
          onPress={() => logout(props)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});