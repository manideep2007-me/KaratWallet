// File: app/dashboard.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useWallet } from '../context/WalletContext';
import { useRouter } from 'expo-router';

const DashboardScreen = () => {
  const { goldBalance, cashBalance, transactions, logout } = useWallet();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [{ text: "Cancel", style: "cancel" }, { text: "OK", onPress: () => logout() }]);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN').format(amount);
  
  const renderTransaction = ({ item }) => (
    <View style={styles.transactionRow}>
      <View><Text style={styles.transactionType}>{item.type}</Text><Text style={styles.transactionDetails}>{item.details}</Text></View>
      <Text style={item.amount > 0 ? styles.amountGreen : styles.amountRed}>
        {item.amount > 0 ? '+' : ''}{item.amount.toFixed(4)} gms
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}><Text style={styles.cardTitle}>Gold Balance</Text><Text style={styles.cardValue}>{goldBalance.toFixed(4)} gms</Text></View>
      <View style={styles.card}><Text style={styles.cardTitle}>Cash Wallet</Text><Text style={styles.cardValue}>₹ {formatCurrency(cashBalance)}</Text></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/buy-gold')}><Text style={styles.buttonText}>Buy Gold</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/transfer-gold')}><Text style={styles.buttonText}>Transfer Gold</Text></TouchableOpacity>
      </View>
      <Text style={styles.historyTitle}>Recent Transactions</Text>
      <FlatList data={transactions} renderItem={renderTransaction} keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noTransactions}>No transactions yet.</Text>} style={{ flex: 1 }} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}><Text style={styles.logoutButtonText}>Logout</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0D1B2A' }, // Dark Blue BG
  card: { backgroundColor: '#1E2A3A', padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#34495E' },
  cardTitle: { fontFamily: 'Inter-Regular', fontSize: 16, color: '#8A9AAB' },
  cardValue: { fontFamily: 'Montserrat-ExtraBold', fontSize: 28, marginTop: 8, color: '#FFD700' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  button: { flex: 1, backgroundColor: '#FFD700', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginHorizontal: 5 },
  buttonText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#0D1B2A' },
  historyTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, marginTop: 20, marginBottom: 10, color: '#FFFFFF' },
  transactionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E2A3A', padding: 15, borderRadius: 8, marginBottom: 10 },
  transactionType: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },
  transactionDetails: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#8A9AAB' },
  amountGreen: { fontFamily: 'Montserrat-ExtraBold', fontSize: 16, color: '#2ECC71' },
  amountRed: { fontFamily: 'Montserrat-ExtraBold', fontSize: 16, color: '#E74C3C' },
  noTransactions: { fontFamily: 'Inter-Regular', textAlign: 'center', marginTop: 20, color: '#888' },
  logoutButton: { backgroundColor: '#34495E', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  logoutButtonText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },
});

export default DashboardScreen;