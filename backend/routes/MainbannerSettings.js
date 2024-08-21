import express from 'express';
import BannerSettings from '../models/BannerSettings.js';

const router = express.Router();

// Get banner settings
router.get('/', async (req, res) => {
  try {
    const settings = await BannerSettings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
});

// Update banner settings
router.put('/', async (req, res) => {
  try {
    const { text, subText, fontSize, backgroundColor } = req.body;
    let settings = await BannerSettings.findOne();

    if (settings) {
      settings.text = text || settings.text;
      settings.subText = subText || settings.subText;
      settings.fontSize = fontSize || settings.fontSize;
      settings.backgroundColor = backgroundColor || settings.backgroundColor;
      await settings.save();
    } else {
      settings = new BannerSettings({
        text,
        subText,
        fontSize,
        backgroundColor,
      });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error });
  }
});

export default router;
