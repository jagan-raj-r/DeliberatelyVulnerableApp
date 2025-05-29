import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Hardcoded API credentials
const API_KEY = "sk-1234567890abcdef";
const SECRET_TOKEN = "jwt_secret_key_12345";

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [userData, setUserData] = useState<any>(null);
  const [comments, setComments] = useState<string>('');

  useEffect(() => {
    // SQL Injection vulnerability via template literals
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    fetchUserData(query);
  }, [userId]);

  const fetchUserData = async (query: string) => {
    try {
      // Insecure HTTP request
      const response = await axios.get(`http://api.vulnapp.com/users?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${SECRET_TOKEN}`,
          'X-API-Key': API_KEY
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCommentSubmit = () => {
    // XSS vulnerability - direct DOM manipulation
    document.getElementById('comments-display')!.innerHTML = comments;
    
    // CSRF vulnerability - no token validation
    axios.post('/api/comments', {
      userId: userId,
      comment: comments
    });
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <div>
          {/* XSS vulnerability - unescaped data */}
          <div dangerouslySetInnerHTML={{ __html: userData.bio }} />
          <p>Email: {userData.email}</p>
        </div>
      )}
      
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Enter your comments..."
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
      
      <div id="comments-display"></div>
    </div>
  );
};
