import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mainImage: { type: String, required: true },
    additionalImages: [String], // Array of strings for filenames
    price: { type: Number, required: true },
    deadline: { type: Date, required: true },
    drawDate: { type: Date, required: true },
    description: { type: String, required: true }
});

const Prize = mongoose.model('Prize', prizeSchema);

export default Prize;
