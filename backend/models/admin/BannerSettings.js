
import mongoose from 'mongoose';

const bannerSettingsSchema = new mongoose.Schema({
    text: { type: String, required: true },
    subText: { type: String, required: true },
    fontSize: { type: String, required: true },
    backgroundColor: { type: String, required: true },
});

const BannerSettings = mongoose.model('BannerSettings', bannerSettingsSchema);

export default BannerSettings;
