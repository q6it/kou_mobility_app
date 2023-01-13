# Kou mobility app

This is a test frontend assignment application for the Tuul company

## Features

-   The user creates an account/logs in with email & password.
-   The user pairs a scooter with the provided pairing code.
-   The user sends the ON/OFF command to the scooter.
-   The user logs out of the application.
-   The app displays the scooter's location.
-   The app displays the user's location.
-   The app displays the current lock status (locked/unlocked).
-   The app displays the scooter’s battery level (%).
-   The app displays the scooter's odometer.
-   The app displays the scooter's estimated range.

## Getting Started

To get started with this app, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/q6it/kou_mobility_app.git
```

2. Install dependencies

```bash
npm install
```

3. Create an .env file in the root directory and add next variables:

    - VITE_API_KEY=`Your firebase app apiKey`
    - VITE_AUTH_DOMAIN=`Your firebase app authDomain`
    - VITE_PROJECT_ID=`Your firebase app projectId`
    - VITE_STORAGE_BUCKET=`Your firebase app storageBucket`
    - VITE_MESSAGING_SENDER_ID=`Your firebase app messagingSenderId`
    - VITE_APP_ID=`Your firebase app appId`
    - VITE_MEASUREMENT_ID=`Your firebase app measurementId`
    - VITE_GOOGLE_API_KEY=`Your google maps api key `

4. Start the development server

```bash
npm run dev
```

## Built With

-   React
-   TypeScript
-   Material UI
-   Vite
-   Firestore
-   Google maps
