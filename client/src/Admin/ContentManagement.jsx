import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentManagement.css';

function ContentManagement() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('/api/content');
        setContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="content-management">
      <h2>Content Management</h2>
      {loading ? (
        <p>Loading content...</p>
      ) : (
        <div className="content-table">
          {content.map((item) => (
            <div key={item.id} className="content-item">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentManagement;
