// File: app/login.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar, SafeAreaView } from 'react-native';
import { useWallet } from '../context/WalletContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useWallet();

  const handleLogin = () => {
    if (!email.includes('@') || password.length < 1) {
      Alert.alert('Error', 'Please enter a valid email and password.');
      return;
    }
    login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>KaratWallet</Text>
        <Text style={styles.subtitle}>Your Digital Gold Wallet</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#8A9AAB" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#8A9AAB" value={password} onChangeText={setPassword} secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1B2A', justifyContent: 'center', padding: 20 }, // Dark Blue BG
  header: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 40, color: '#FFD700', fontFamily: 'Montserrat-ExtraBold' }, // Gold Title
  subtitle: { fontSize: 18, color: '#8A9AAB', fontFamily: 'Inter-Regular', marginTop: 10 }, // Muted Blue for Subtitle
  inputContainer: { width: '100%', marginBottom: 20 },
  input: {
    width: '100%', height: 55, backgroundColor: '#1E2A3A', borderRadius: 12, paddingHorizontal: 15,
    marginBottom: 20, color: '#FFFFFF', fontSize: 16, fontFamily: 'Inter-Regular', borderWidth: 1, borderColor: '#34495E'
  }, // Darker elements
  button: { width: '100%', height: 55, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  buttonText: { fontSize: 18, fontFamily: 'Poppins-Bold', color: '#0D1B2A' }, // Dark Blue text on Gold Button
});

export default LoginScreen;