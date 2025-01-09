# TestApp

A React Native application that allows users to enter their credentials, validates the input, and fetches a list of popular movies from the TMDB API. The app supports English and Arabic languages.

## Features

Screen 1:

A form with two fields: Email and Password.
Validates email format and password requirements.
Password must be:
8–15 characters.
Alphanumeric.
Contain at least one uppercase letter and one special character.
Submit button is disabled until inputs are valid.
Upon successful validation, navigates to Screen 2.

Screen 2:

Fetches a list of popular movies from the TMDB API.
Displays movies in a grid view with 2 columns.
Each grid item includes the movie title and poster image.

Localization:

Supports English and Arabic languages.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

Node.js (v16 or later)
npm (comes with Node.js) or yarn (optional package manager)

### Install Dependencies

Go to project folder and install dependencies using npm or yarn
npm : npm install
yarn : yarn

This command will create node_modules into your project folder

### Run Project

To run the project , run following command based on package manager you are using
npm: npm start
yarn : yarn start

This will start the development server and run the project locally on your machine .
It will also provide the url which you can put in your preferred browser to see your application.

on Android

npm: npm run android
yarn: yarn android

It will run the project in emulator or usb debugged real device

Feel free to explore the live demo or run the project locally. Happy coding! 🎉
