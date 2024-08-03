import DrawResult from '../models/DrawResult.js';
import Winner from '../models/Winner.js';


const generateRandomNumbers = (count, max) => {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};


export const getCurrentDraw = async (req, res) => {
    try {
        const latestDraw = await DrawResult.findOne().sort({ date: -1 }).exec();
        if (latestDraw) {
            return res.status(200).json(latestDraw);
        } else {
            return res.status(200).json({ numbers: generateRandomNumbers(6, 60) });
        }
    } catch (error) {
        console.error('Error fetching current draw:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const getPastResults = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const results = await DrawResult.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ date: -1 })
            .exec();
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching past results:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getWinnerAnnouncements = async (req, res) => {
    try {
        const winners = await Winner.find().sort({ date: -1 }).exec();
        res.status(200).json(winners);
    } catch (error) {
        console.error('Error fetching winner announcements:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
