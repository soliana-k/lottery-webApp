import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mainImage: { type: String, required: true },
    additionalImage1: { type: String }, // Single string for each additional image
    additionalImage2: { type: String },
    additionalImage3: { type: String },
    price: { type: Number, required: true },
    deadline: { type: Date, required: true },
    drawDate: { type: Date, required: true },
    description: { type: String, required: true }
});


const Prize = mongoose.model('Prize', prizeSchema);

export default Prize;