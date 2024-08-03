import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true 
        },
    prize: { 
        type: String,
         required: true
         },
    date: { 
        type: Date, 
        default: Date.now
     }
});

const Winner = mongoose.model('Winner', winnerSchema);

export default Winner;
