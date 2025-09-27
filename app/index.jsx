// File: app/index.jsx

import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0D1B2A', '#1E2A3A']} // Dark Blue Gradient
        style={styles.gradient}
      >
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }}/>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 250, height: 250, resizeMode: 'contain' }
});

export default SplashScreen;