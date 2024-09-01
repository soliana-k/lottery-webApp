import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    deadline: { type: Date, required: true },
    drawDate: { type: Date, required: true },
    description: { type: String, required: true }

});

const Prize = mongoose.model('Prize', prizeSchema);

export default Prize;
