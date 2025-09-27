// File: app/buy-gold.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, SafeAreaView } from 'react-native';
import { useWallet } from '../context/WalletContext';
import { useRouter } from 'expo-router';

const BuyGoldScreen = () => {
  const { buyGold } = useWallet();
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const GOLD_PRICE_PER_GRAM = 10000;

  const handleBuyGold = () => {
    Keyboard.dismiss();
    const inrAmount = parseFloat(amount);
    if (isNaN(inrAmount) || inrAmount <= 0) { Alert.alert('Error', 'Please enter a valid amount.'); return; }
    const success = buyGold(inrAmount);
    if (success) { Alert.alert('Success', 'Purchase successful!'); router.back(); } 
    else { Alert.alert('Error', 'Insufficient cash balance.'); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Enter amount in INR</Text>
      <TextInput style={styles.input} placeholder="e.g., 5000" placeholderTextColor="#8A9AAB" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      {amount > 0 && (
        <Text style={styles.infoText}>
          You will get: <Text style={styles.infoHighlight}>{(amount / GOLD_PRICE_PER_GRAM).toFixed(4)} gms</Text>
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleBuyGold}>
        <Text style={styles.buttonText}>Confirm Purchase</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#0D1B2A' },
    label: { fontFamily: 'Inter-Regular', fontSize: 16, marginBottom: 10, color: '#8A9AAB' },
    input: {
        width: '100%', height: 55, backgroundColor: '#1E2A3A', borderRadius: 12, paddingHorizontal: 15,
        marginBottom: 20, color: '#FFFFFF', fontSize: 18, fontFamily: 'Inter-Regular', borderWidth: 1, borderColor: '#34495E'
    },
    infoText: { textAlign: 'center', marginBottom: 20, fontSize: 16, color: '#8A9AAB', fontFamily: 'Inter-Regular' },
    infoHighlight: { fontFamily: 'Montserrat-ExtraBold', color: '#FFD700' },
    button: { width: '100%', height: 55, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginTop: 10 },
    buttonText: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#0D1B2A' },
});

export default BuyGoldScreen;