import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { courseAPI } from '../services/api';
import CourseCard from './CourseCard';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getFeaturedCourses();
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to fetch featured courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, courses.length - 2));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, courses.length - 2)) % Math.max(1, courses.length - 2));
  };

  if (loading) return <div className="text-center py-10">Loading courses...</div>;

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">🎓 Featured Free Courses</h2>
        <p className="text-gray-600 mb-8">Learn from industry experts completely free!</p>

        {courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No featured courses available</div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.slice(currentIndex, currentIndex + 3).map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>

            {courses.length > 3 && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}

            <div className="text-center mt-8">
              <Link to="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block">
                View All Courses →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}