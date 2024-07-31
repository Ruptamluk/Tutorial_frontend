// pages/protected.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/auth/user', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await axios.post('http://127.0.0.1:5000/api/auth/logout', {}, {
      withCredentials: true,
    });
    router.push('/signin');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Protected Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
