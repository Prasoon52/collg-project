# TLE Terminator - AI-Powered Learning Management System

TLE Terminator is a cutting-edge Learning Management System (LMS) designed to enhance the learning experience through AI integration, real-time engagement monitoring, and interactive live sessions.

## 🚀 Key Features

- **AI-Powered Learning:** Integrated chat and search assistants powered by Google Gemini and OpenAI.
- **Attention Engine:** Real-time monitoring of student engagement using computer vision to ensure active participation.
- **Live Interactive Classes:** High-quality video streaming with interactive features using Stream SDK.
- **Real-time Quizzes:** Live quiz system with instant feedback, analysis, and leaderboards.
- **Analytics Dashboard:** Comprehensive visualization of student progress and lecture engagement.
- **Secure Payments:** Seamless course enrollment with Razorpay integration.
- **Gamified Learning:** Leaderboards and performance tracking to keep students motivated.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS & Framer Motion
- **Visualizations:** Recharts
- **Communication:** Socket.io-client, Stream Video SDK
- **Authentication:** Firebase Auth (Google)

### Backend
- **Environment:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **AI Services:** Google Generative AI (Gemini), OpenAI
- **Real-time Engine:** Socket.io
- **Payments:** Razorpay
- **Cloud Storage:** Cloudinary
- **Email Service:** Nodemailer

### Attention Engine
- **Language:** Python
- **Libraries:** OpenCV, Flask , MediaPipe

## 📁 Project Structure

```text
/
├── backend/            # Express server & API endpoints
├── frontend/           # React application (Vite)
└── attention_engine/   # Python-based engagement tracking
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB Atlas account
- Cloudinary, Razorpay, and Stream SDK credentials
- Gemini/OpenAI API keys

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/lms-by-tle-terminator.git
   cd lms-by-tle-terminator
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with the following variables:
   # PORT, DB_URL, DB_NAME, JWT_SECRET, 
   # CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
   # RAZORPAY_KEY_ID, RAZORPAY_SECRET,
   # STREAM_API_KEY, STREAM_SECRET_KEY,
   # GEMINI_API_KEY, EMAIL, EMAIL_PASS
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file with the following variables:
   # VITE_API_URL, VITE_FIREBASE_APIKEY
   npm run dev
   ```

4. **Attention Engine Setup**
   ```bash
   cd ../attention_engine
   python -m venv venv
   source venv/bin/activate # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python app.py
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


