// File: context/WalletContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletContext = createContext(null);
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [goldBalance, setGoldBalance] = useState(100.0);
  const [cashBalance, setCashBalance] = useState(100000);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedDataJSON = await AsyncStorage.getItem('walletData');
        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
        
        if (savedDataJSON !== null) {
          const savedData = JSON.parse(savedDataJSON);
          setGoldBalance(savedData.gold);
          setCashBalance(savedData.cash);
          setTransactions(savedData.transactions || []);
        }
        if (loggedInStatus === 'true') {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
        if(!isLoading) {
            try {
                const dataToSave = { gold: goldBalance, cash: cashBalance, transactions: transactions };
                await AsyncStorage.setItem('walletData', JSON.stringify(dataToSave));
            } catch (e) {
                console.error("Failed to save data", e);
            }
        }
    };
    saveData();
  }, [goldBalance, cashBalance, transactions, isLoading]);

  const login = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('isLoggedIn', 'true');
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('isLoggedIn');
  };

  const addTransaction = (type, amount, details) => {
    const newTransaction = {
      id: Date.now().toString(), type, amount, details, date: new Date(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const buyGold = (inrAmount) => {
    const GOLD_PRICE_PER_GRAM = 10000;
    if (inrAmount > cashBalance) return false;
    
    const goldPurchased = inrAmount / GOLD_PRICE_PER_GRAM;
    setGoldBalance(prev => prev + goldPurchased);
    setCashBalance(prev => prev - inrAmount);
    addTransaction('Buy', goldPurchased, `Purchased for ₹${inrAmount}`);
    return true;
  };

  const transferGold = (grams, recipient) => {
    if (grams > goldBalance) return false;
    
    setGoldBalance(prev => prev - grams);
    addTransaction('Transfer', -grams, `Transferred to ${recipient}`);
    return true;
  };

  const value = {
    isLoggedIn, isLoading, goldBalance, cashBalance, transactions,
    login, logout, buyGold, transferGold,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};