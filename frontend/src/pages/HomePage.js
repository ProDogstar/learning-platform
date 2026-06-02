import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedCourses from '../components/FeaturedCourses';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">🎓 Learn, Grow & Excel</h1>
          <p className="text-xl text-blue-100 mb-8">
            Professional online courses with both free and premium content. Learn from industry experts and advance your career.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Explore Courses →
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose EduPlatform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-bold mb-2">Video Courses</h3>
              <p className="text-gray-600">High-quality video lessons with professional instructors</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Affordable</h3>
              <p className="text-gray-600">50% free courses + 50% premium content at great prices</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Track your learning progress with detailed analytics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Certificates</h3>
              <p className="text-gray-600">Earn certificates upon course completion</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedCourses />

      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold">500+</div>
              <p className="text-blue-100 mt-2">Courses Available</p>
            </div>
            <div>
              <div className="text-5xl font-bold">100K+</div>
              <p className="text-blue-100 mt-2">Active Students</p>
            </div>
            <div>
              <div className="text-5xl font-bold">50+</div>
              <p className="text-blue-100 mt-2">Expert Instructors</p>
            </div>
            <div>
              <div className="text-5xl font-bold">4.8★</div>
              <p className="text-blue-100 mt-2">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 text-lg mb-8">Join thousands of students already learning on our platform</p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-blue-700 transition inline-block text-lg"
          >
            Sign Up Now - It's Free! 🚀
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🎓 EduPlatform</h3>
              <p className="text-gray-400">Professional learning platform for everyone</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 EduPlatform. All rights reserved. Made with ❤️ by ProDogstar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}