# Karatpay - A Mini Gold Wallet App 🪙

[cite_start]This is a fully functional "Gold Wallet" mobile application built with **React Native** and the **Expo framework**, developed as a part of an internship assignment[cite: 2].

## ✨ Features Implemented

- [cite_start]**Complete App Setup** using Expo[cite: 4].
- [cite_start]**User Authentication:** Simple dummy login screen with navigation to the dashboard on success[cite: 6, 7].
- [cite_start]**Dashboard:** Displays the user's Gold & Cash balances and has buttons to navigate to the Buy and Transfer screens[cite: 8, 9, 10].
- [cite_start]**Buy Gold:** Functionality to buy digital gold with INR, assuming a hardcoded price of ₹10,000/gram[cite: 11, 12, 13].
- [cite_start]**Transfer Gold:** Functionality to transfer gold to other users by checking for sufficient balance[cite: 14, 15].

### Extra (Optional) Features Implemented
- [cite_start]**✅ Persistent Storage:** Wallet balances and login state are saved persistently on the device using **AsyncStorage**[cite: 17].
- [cite_start]**✅ Transaction History:** The dashboard displays a list of all buy and transfer transaction records[cite: 18].
- **✅ Professional Dark UI:** The app features a custom-designed dark blue and gold theme with professional fonts for a clean and vibrant user experience.

## 🛠️ Tech Stack

- **Framework:** React Native with Expo (Router)
- **State Management:** React Context API
- **Local Storage:** AsyncStorage
- **Fonts:** Montserrat, Poppins, Inter
- **UI & Styling:** React Native StyleSheet

## 🚀 How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/manideep2007-me/KaratWallet.git](https://github.com/manideep2007-me/KaratWallet.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd KaratWallet
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the Expo server:**
    (For best results, use the `--clear` flag the first time)
    ```bash
    npx expo start --clear
    ```
5.  **Scan the QR code with the Expo Go app on your iOS or Android device.**

## 📝 Code & State Management

- [cite_start]**Code Structure:** The code is organized with a root `context` folder for state management and an `app` directory for file-based routing with Expo Router, ensuring readability[cite: 22].
- [cite_start]**State Management:** A centralized state management solution is implemented using React Context to handle the wallet's global state (balances, transactions, login status) efficiently[cite: 24].