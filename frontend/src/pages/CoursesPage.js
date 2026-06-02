import React, { useEffect, useState } from 'react';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', level: '', search: '', isFree: null });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, courses]);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses({});
      setCourses(response.data);
    } catch (err) {
      console.error('Failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = courses;
    if (filters.search) result = result.filter(c => c.title.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.category) result = result.filter(c => c.category === filters.category);
    if (filters.level) result = result.filter(c => c.level === filters.level);
    if (filters.isFree !== null) result = result.filter(c => c.isFree === filters.isFree);
    setFilteredCourses(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">📚 All Courses</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search courses..."
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Data Science">Data Science</option>
            </select>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              value={filters.isFree === null ? '' : filters.isFree}
              onChange={(e) => handleFilterChange('isFree', e.target.value === '' ? null : e.target.value === 'true')}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Courses</option>
              <option value="true">Free Only</option>
              <option value="false">Paid Only</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-4">{filteredCourses.length} courses found</p>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No courses match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}