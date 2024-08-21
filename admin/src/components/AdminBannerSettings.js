import React, { useState, useEffect } from 'react';
import './AdminBannerSettings.css'; 
import Breadcrumbs from '../breadcrumb';

const AdminBannerSettings = () => {
  const [settings, setSettings] = useState({
    text: '',
    subText: '',
    fontSize: '',
    backgroundColor: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/v1/banner');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching banner settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/v1/banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="form-container">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Content Management', href: '/content' },
          { label: 'Banner Settings', href: '/content/AdminBannerSettings' }
        ]}
      />
      <form className="banner-form" onSubmit={handleSubmit}>
        <h2>Banner Settings</h2>
        <label className="form-label">
          Banner Text:
          <input
            type="text"
            name="text"
            value={settings.text}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Subtext:
          <input
            type="text"
            name="subText"
            value={settings.subText}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Font Size:
          <input
            type="text"
            name="fontSize"
            value={settings.fontSize}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Background Color:
          <input
            type="text"
            name="backgroundColor"
            value={settings.backgroundColor}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">Update Settings</button>
      </form>
    </div>
  );
};

export default AdminBannerSettings;
