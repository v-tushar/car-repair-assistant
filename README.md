# Car Repair AI Assistant 🚗🤖

This project is an AI-powered assistant that helps users diagnose basic car issues through chat interactions and image analysis.

👉 [Watch Project Demo on YouTube](https://youtu.be/SjHj4v6CdXc)

---

## Features
- 🔒 User Authentication (Signup, Login) using Firebase Authentication
- 💬 Chat interface powered by Google Gemini Generative AI
- 📷 Upload car images for AI-based repair insights
- ☁️ Backend powered by Firebase Functions
- ⚡ Frontend built with Next.js and Tailwind CSS
- 🗂️ Firestore integration for storing chat history

---

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Firebase Functions, Google Generative AI API
- **Authentication**: Firebase Auth
- **Database**: Firestore

---

## Project Structure
/app - Frontend pages (Chat, Signup) /backend - Cloud Functions (API logic) /components - UI components (Chat interface, Forms) /lib - Firebase setup
---

## Future Improvements
- 🔧 Improve AI models with real car diagnostic datasets
- 🎙️ Integrate voice-based question answering
- 🛠️ Connect with local mechanics for booking repairs

---

## How to Run Locally

### Install dependencies
```
npm install
```
Run the development server
```
npm run dev
```
Run Firebase functions locally
```
cd backend/functions
npm install
firebase emulators:start
