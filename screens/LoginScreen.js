import React from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authAction from '../redux/actions/authAction';

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function LoginScreen(navProps) {
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.wrapper}
    >
      <ScrollView>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            dispatch(authAction.loginUser(values))
              .then(async (result) => {
                if (result.success) {
                  try {
                    await AsyncStorage.setItem('token', result.token);
                    navProps.navigation.navigate('Home');
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  Alert.alert(result.message);
                }
              })
              .catch(err => console.log(err));
          }}
        >
          {(props) => (
            <View style={styles.container}>
              <View style={styles.logo}>
                <Image style={styles.image} />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  keyboardType="email-address"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
                <Text>{ props.touched.email && props.errors.email }</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
                <Text>{ props.touched.password && props.errors.password }</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Don't have an account?</Text>
                  <TouchableOpacity onPress={() => navProps.navigation.navigate('Register')}>
                    <Text style={styles.registerButton}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },

  image: {
    width: 70,
    height: 70,
  },

  input: {
    width: 300,
    backgroundColor: '#b6bfc4',
    borderRadius: 25,
    padding: 16,
    fontSize: 16,
    marginVertical: 10,
  },

  button: {
    width: 300,
    backgroundColor: '#738289',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },

  registerContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },

  registerText: {
    color: '#738289',
    fontSize: 16,
  },

  registerButton: {
    color: '#738289',
    fontSize: 16,
    fontWeight: 'bold',
  },
});