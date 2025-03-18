import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const LogOut = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
      setErrorMessage('An error occurred during sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Are you sure you want to log out?</h1>
      <p className="mb-6 text-gray-500">Logging out will end your session.</p>

      {errorMessage && (
        <div className="mb-4 text-red-600">
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <button
          onClick={() => navigate('/home')}
          className="underline hover:text-blue-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOut;
