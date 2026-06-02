import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiShoppingCart, FiBook } from 'react-icons/fi';

export default function CourseCard({ course }) {
  const categoryColor = {
    'Programming': 'bg-blue-100 text-blue-800',
    'Design': 'bg-pink-100 text-pink-800',
    'Business': 'bg-green-100 text-green-800',
    'Data Science': 'bg-purple-100 text-purple-800',
    'Other': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img 
          src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} 
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`${categoryColor[course.category] || categoryColor['Other']} px-3 py-1 rounded-full text-sm font-semibold`}>
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.shortDescription || course.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <img 
            src={course.instructorImage || 'https://via.placeholder.com/32'} 
            alt={course.instructorName}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-700">{course.instructorName}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FiPlay size={16} />
            <span>{course.videos?.length || 0} videos</span>
          </div>
          <div className="flex items-center gap-1">
            <FiBook size={16} />
            <span>{course.duration || 0} mins</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-semibold">{course.rating || 0}/5</span>
          <span className="text-sm text-gray-600">({course.reviews?.length || 0})</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {course.isFree ? (
              <span className="text-xl font-bold text-green-600">FREE</span>
            ) : (
              <div>
                <span className="text-xl font-bold text-gray-800">₹{course.price}</span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">₹{course.originalPrice}</span>
                )}
              </div>
            )}
          </div>
          <Link 
            to={`/course/${course._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiShoppingCart size={16} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
