import mongoose from 'mongoose';

const numberSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'taken'],
        default: 'available',
    },
});

export default mongoose.model('Number', numberSchema);
