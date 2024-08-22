import mongoose from 'mongoose';

const bannerSettingsSchema = new mongoose.Schema({
    text: { type: String, default: 'Bet the Number, Win Big Prizes'},
    subText: {type: String, default: 'Play Now and Try Your Luck!'},
    fontSize: {type: String, default: '2rem'},
    backgroundColor: {type: String, default:'rgb(19, 51, 81)'},
});

export default mongoose.model('BannerSettings', bannerSettingsSchema);