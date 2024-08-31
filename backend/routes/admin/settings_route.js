import express from 'express';
import {
  getHomepageSettings,
  getBannerSettings,
  getFooterSettings,
  updateHomepageSettings,
  updateBannerSettings,
  updateFooterSettings
} from '../../controllers/admin/settingsController.js';

const router = express.Router();

// Fetch settings with type query parameter
router.get('/', (req, res) => {
  const { type } = req.query;
  if (type === 'homepage') {
    return getHomepageSettings(req, res);
  } 
  if (type === 'banner') {
    return getBannerSettings(req, res);
  } 
  if (type === 'footer') {
    return getFooterSettings(req, res);
  }
  res.status(400).json({ error: 'Invalid type parameter' });
});

// Update settings
router.put('/', (req, res) => {
  const { type, ...settings } = req.body;
  if (type === 'homepage') {
    return updateHomepageSettings(req, res);
  } 
  if (type === 'banner') {
    return updateBannerSettings(req, res);
  } 
  if (type === 'footer') {
    return updateFooterSettings(req, res);
  }
  res.status(400).json({ error: 'Invalid type parameter' });
});

export default router;
