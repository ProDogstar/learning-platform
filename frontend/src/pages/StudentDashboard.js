import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAPI } from '../services/api';
import CourseCard from '../components/CourseCard';

export default function StudentDashboard() {
  const { user } = useSelector(state => state.auth);
  const [dashboard, setDashboard] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashRes, enrollRes, purchaseRes] = await Promise.all([
        userAPI.getDashboard(),
        userAPI.getEnrolledCourses(),
        userAPI.getPurchasedCourses()
      ]);
      setDashboard(dashRes.data);
      setEnrolledCourses(enrollRes.data);
      setPurchasedCourses(purchaseRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName}! 👋</h1>
          <p className="text-blue-100">Keep learning and grow your skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-bold text-blue-600">{dashboard?.totalEnrollments || 0}</div>
            <p className="text-gray-600 mt-2">Courses Enrolled</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-bold text-green-600">{dashboard?.totalPurchases || 0}</div>
            <p className="text-gray-600 mt-2">Courses Purchased</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-bold text-purple-600">₹{dashboard?.totalSpent || 0}</div>
            <p className="text-gray-600 mt-2">Total Spent</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📚 Enrolled Courses</h2>
          {enrolledCourses.length === 0 ? (
            <p className="text-gray-600">No enrolled courses yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enrolledCourses.map(enroll => (
                <CourseCard key={enroll.courseId?._id} course={enroll.courseId} />
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🛒 Purchased Courses</h2>
          {purchasedCourses.length === 0 ? (
            <p className="text-gray-600">No purchased courses yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {purchasedCourses.map(purchase => (
                <CourseCard key={purchase.courseId?._id} course={purchase.courseId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}