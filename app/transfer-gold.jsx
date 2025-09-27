// File: app/transfer-gold.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, SafeAreaView } from 'react-native';
import { useWallet } from '../context/WalletContext';
import { useRouter } from 'expo-router';

const TransferGoldScreen = () => {
  const { transferGold } = useWallet();
  const router = useRouter();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [grams, setGrams] = useState('');

  const handleTransfer = () => {
    Keyboard.dismiss();
    const gramsToTransfer = parseFloat(grams);
    if (!recipientEmail.includes('@')) { Alert.alert('Error', 'Please enter a valid recipient email.'); return; }
    if (isNaN(gramsToTransfer) || gramsToTransfer <= 0) { Alert.alert('Error', 'Please enter a valid amount of gold.'); return; }
    const success = transferGold(gramsToTransfer, recipientEmail);
    if (success) { Alert.alert('Success', 'Transfer successful!'); router.back(); } 
    else { Alert.alert('Error', 'Insufficient gold balance for this transfer.'); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Recipient's Email</Text>
      <TextInput style={styles.input} placeholder="e.g., friend@example.com" placeholderTextColor="#8A9AAB"
        keyboardType="email-address" autoCapitalize="none" value={recipientEmail} onChangeText={setRecipientEmail} />
      <Text style={styles.label}>Amount of Gold (grams)</Text>
      <TextInput style={styles.input} placeholder="e.g., 10.5" placeholderTextColor="#8A9AAB"
        keyboardType="numeric" value={grams} onChangeText={setGrams} />
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer Now</Text>
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
    button: { width: '100%', height: 55, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginTop: 10 },
    buttonText: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#0D1B2A' },
});

export default TransferGoldScreen;