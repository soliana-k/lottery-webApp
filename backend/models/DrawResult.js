import mongoose from 'mongoose';

const drawResultSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    numbers: {
        type: [Number],
        required: true
    },
    winners: [{
        number: Number,
        selectedBy: String  
    }]
});

const DrawResult = mongoose.model('DrawResult', drawResultSchema);

export default DrawResult;
