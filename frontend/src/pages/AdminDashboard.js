import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { courseAPI, userAPI } from '../services/api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function AdminDashboard() {
  const { user } = useSelector(state => state.auth);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tab === 'courses') fetchCourses();
    if (tab === 'users') fetchUsers();
    setLoading(false);
  }, [tab]);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses({});
      setCourses(response.data);
    } catch (err) {
      console.error('Failed:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAllUsers({ limit: 100 });
      setUsers(response.data.users);
    } catch (err) {
      console.error('Failed:', err);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Delete this course?')) {
      try {
        await courseAPI.deleteCourse(id);
        setCourses(courses.filter(c => c._id !== id));
        alert('Course deleted');
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🔐</h1>
          <p className="text-orange-100">Manage courses, users, and content</p>
        </div>

        <div className="flex gap-4 mb-8 border-b">
          {['dashboard', 'courses', 'users'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-semibold capitalize ${tab === t ? 'border-b-4 border-orange-600 text-orange-600' : 'text-gray-600'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6"><div className="text-4xl font-bold text-blue-600">{courses.length}</div><p className="text-gray-600 mt-2">Total Courses</p></div>
            <div className="bg-white rounded-lg shadow p-6"><div className="text-4xl font-bold text-green-600">{users.length}</div><p className="text-gray-600 mt-2">Registered Users</p></div>
            <div className="bg-white rounded-lg shadow p-6"><div className="text-4xl font-bold text-purple-600">₹{courses.reduce((sum, c) => sum + (c.totalSales || 0), 0)}</div><p className="text-gray-600 mt-2">Total Revenue</p></div>
          </div>
        )}

        {tab === 'courses' && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Title</th>
                  <th className="px-6 py-3 text-left font-semibold">Category</th>
                  <th className="px-6 py-3 text-left font-semibold">Price</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{course.title}</td>
                    <td className="px-6 py-3">{course.category}</td>
                    <td className="px-6 py-3">{course.isFree ? 'Free' : `₹${course.price}`}</td>
                    <td className="px-6 py-3"><span className={`px-3 py-1 rounded text-sm font-semibold ${course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><FiEdit2 /></button>
                      <button onClick={() => deleteCourse(course._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'users' && (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Role</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{u.firstName} {u.lastName}</td>
                    <td className="px-6 py-3">{u.email}</td>
                    <td className="px-6 py-3 capitalize">{u.role}</td>
                    <td className="px-6 py-3"><span className={`px-3 py-1 rounded text-sm font-semibold ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}