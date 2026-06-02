# 🎓 Professional Learning Platform

A full-stack learning management system with video streaming, user authentication, admin dashboard, and Indian payment integration (Razorpay).

## ✨ Key Features

### 👨‍🎓 Student Features
- User registration & JWT authentication
- Browse courses with video sliders
- Free & Paid content separation
- Purchase courses with Razorpay
- Track learning progress
- Personal student dashboard
- Responsive design

### 👨‍💼 Admin Features
- Admin authentication & dashboard
- Add/Edit/Delete courses
- Manage course videos & descriptions
- User management & analytics
- Set content as free/paid
- View payment transactions
- Course analytics

### 💳 Payment System
- Razorpay integration (Indian payments)
- Secure payment verification
- Payment history & invoices
- Subscription management
- Order tracking

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Redux, Axios, Tailwind CSS, React Router |
| **Backend** | Node.js, Express.js, JWT, Mongoose |
| **Database** | MongoDB |
| **Payments** | Razorpay API |
| **Utilities** | Python (video processing, analytics) |
| **Deployment** | Docker ready |

## 📁 Project Structure

```
learning-platform/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── redux/               # Redux store
│   │   ├── services/            # API services
│   │   ├── hooks/               # Custom hooks
│   │   └── App.js
│   ├── public/
│   └── package.json
│
├── backend/                     # Node.js/Express API
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API routes
│   ├── controllers/             # Route handlers
│   ├── middleware/              # Auth & error handling
│   ├── config/                  # Configuration
│   ├── utils/                   # Utilities
│   ├── server.js                # Entry point
│   └── package.json
│
├── python-scripts/              # Python utilities
│   ├── video_processor.py       # Video optimization
│   ├── analytics.py             # Data analysis
│   └── requirements.txt
│
└── docs/                        # Documentation
    ├── API.md
    ├── SETUP.md
    └── DEPLOYMENT.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Python 3.8+
- MongoDB (local or Atlas)
- Razorpay Account

### 1. Clone & Setup

```bash
git clone https://github.com/ProDogstar/learning-platform.git
cd learning-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/learning_platform
JWT_SECRET=your_super_secret_jwt_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup (new terminal)

```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

Start frontend:
```bash
npm start
```

Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:5000

### 4. Python Scripts (optional)

```bash
cd python-scripts
pip install -r requirements.txt
python video_processor.py
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - Logout

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Payment history

### Users
- `GET /api/users/profile` - User profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/dashboard` - Dashboard data
- `GET /api/users/admin/all-users` - All users (Admin)

### Progress
- `POST /api/progress/track` - Track course progress
- `GET /api/progress/:courseId` - Get progress

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication:
- Students get user tokens
- Admins get admin tokens
- Tokens expire in 7 days
- Refresh token mechanism included

## 💳 Payment Flow

1. Student selects a paid course
2. System creates Razorpay order
3. Student completes payment
4. Razorpay returns payment details
5. Backend verifies signature
6. Course access granted
7. Payment recorded in MongoDB

## 📊 Free vs Paid Content

- Courses marked as `isFree: true` - Accessible to all
- Courses marked as `isFree: false` - Require purchase
- Admin can toggle free/paid status anytime
- Student dashboard shows both free & purchased courses

## 🎥 Video Management

- Upload videos with course creation
- Video streaming with HLS/MP4 support
- Video progress tracking
- Download support for offline viewing
- Python script for video optimization

## 👨‍💻 Admin Dashboard

- **Dashboard**: Overview of users, courses, revenue
- **Courses**: Full CRUD operations
- **Users**: Manage student accounts
- **Payments**: Transaction history & analytics
- **Analytics**: Revenue, enrollment, popular courses
- **Settings**: System configuration

## 🎨 UI Components

Pre-built components included:
- Navigation bars
- Video sliders/carousels
- Course cards
- Payment checkout form
- User profile
- Admin dashboard layouts
- Loading spinners
- Error boundaries

## 🔒 Security Features

- Password hashing (bcrypt)
- JWT token verification
- Razorpay signature verification
- CORS protection
- Input validation
- Rate limiting
- Protected routes

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive classes
- Works on all devices
- Touch-friendly interface

## 🐳 Docker Support

```bash
docker-compose up
```

## 📖 Documentation

- [API Documentation](./docs/API.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 📝 Environment Variables

### Backend
```
PORT=5000
MONGO_URI=mongodb://...
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=key_id
RAZORPAY_KEY_SECRET=key_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY=your_key_id
```

## 🚀 Deployment

Ready for deployment on:
- Heroku
- Vercel
- AWS
- Google Cloud
- Azure
- DigitalOcean

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for instructions.

## 📄 License

MIT License - feel free to use this project

## 👨‍🔧 Support & Contribution

For issues, feature requests, or contributions, please open an issue or pull request.

## 🎯 Roadmap

- [ ] Live classes/webinars
- [ ] Discussion forums
- [ ] Certificates
- [ ] Gamification (badges, points)
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Analytics dashboard enhancements

---

**Happy Learning! 🚀**

Built with ❤️ by ProDogstar
