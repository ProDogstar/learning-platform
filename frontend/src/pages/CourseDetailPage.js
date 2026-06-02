import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseAPI, paymentAPI } from '../services/api';
import { useSelector } from 'react-redux';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await courseAPI.getCourseById(id);
      setCourse(response.data);
    } catch (err) {
      console.error('Failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) { alert('Please login first'); return; }
    if (course.isFree) { alert('Free course - access immediately'); return; }

    setProcessingPayment(true);
    try {
      const response = await paymentAPI.createOrder(id);
      const { order } = response.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'EduPlatform',
        description: course.title,
        order_id: order.id,
        handler: async (response) => {
          try {
            await paymentAPI.verifyPayment({
              razorpayOrderId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              courseId: id
            });
            alert('Payment successful!');
            window.location.href = '/dashboard';
          } catch (err) {
            alert('Verification failed');
          }
        },
        prefill: { name: `${user?.firstName} ${user?.lastName}`, email: user?.email }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Failed to create order');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={course.thumbnail || 'https://via.placeholder.com/800x400'} alt={course.title} className="w-full h-96 object-cover rounded-lg mb-8" />
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <img src={course.instructorImage || 'https://via.placeholder.com/64'} alt={course.instructorName} className="w-16 h-16 rounded-full" />
              <div><h3 className="font-semibold text-lg">{course.instructorName}</h3><p className="text-gray-600">{course.level}</p></div>
            </div>
            <div className="mb-8"><h2 className="text-2xl font-bold mb-4">About this course</h2><p className="text-gray-700 leading-relaxed">{course.description}</p></div>
            <div className="mb-8"><h2 className="text-2xl font-bold mb-4">📹 Course Content ({course.videos?.length || 0} videos)</h2>
              <div className="space-y-2">
                {course.videos?.map((video, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg border"><h4 className="font-semibold">{video.title}</h4><p className="text-sm text-gray-600">{video.duration} minutes</p></div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <div className="mb-6">
                {course.isFree ? (
                  <span className="text-4xl font-bold text-green-600">FREE</span>
                ) : (
                  <div><span className="text-4xl font-bold">₹{course.price}</span>{course.originalPrice && <span className="text-lg text-gray-500 line-through ml-3">₹{course.originalPrice}</span>}</div>
                )}
              </div>
              <button
                onClick={handleEnroll}
                disabled={processingPayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 mb-4"
              >
                {processingPayment ? 'Processing...' : course.isFree ? 'Enroll Free' : 'Enroll Now'}
              </button>
              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Enrollments:</span><span className="font-semibold">{course.totalEnrollments}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Rating:</span><span className="font-semibold">⭐ {course.rating}/5</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Duration:</span><span className="font-semibold">{course.duration} mins</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Level:</span><span className="font-semibold">{course.level}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}