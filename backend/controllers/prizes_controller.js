import Prize from '../models/prizes.js';

export const addPrize = async (req, res) => {
    try {
        const { name, price, deadline, drawDate, description } = req.body;
        
        const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const additionalImage1 = req.files['additionalImage1'] ? req.files['additionalImage1'][0].filename : null;
        const additionalImage2 = req.files['additionalImage2'] ? req.files['additionalImage2'][0].filename : null;
        const additionalImage3 = req.files['additionalImage3'] ? req.files['additionalImage3'][0].filename : null;

        const newPrize = new Prize({
            name,
            mainImage,
            additionalImage1, // Store each image separately
            additionalImage2,
            additionalImage3,
            price,
            deadline,
            drawDate,
            description
        });

        await newPrize.save();
        res.status(201).json(newPrize);
    } catch (error) {
        res.status(500).json({ message: 'Error adding prize', error });
    }
};

export const updatePrize = async (req, res) => {
    try {
        const { name, price, deadline, drawDate, description } = req.body;
        const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const additionalImage1 = req.files['additionalImage1'] ? req.files['additionalImage1'][0].filename : null;
        const additionalImage2 = req.files['additionalImage2'] ? req.files['additionalImage2'][0].filename : null;
        const additionalImage3 = req.files['additionalImage3'] ? req.files['additionalImage3'][0].filename : null;

        const updateData = { name, price, deadline, drawDate, description };

        if (mainImage) updateData.mainImage = mainImage;
        if (additionalImage1) updateData.additionalImage1 = additionalImage1;
        if (additionalImage2) updateData.additionalImage2 = additionalImage2;
        if (additionalImage3) updateData.additionalImage3 = additionalImage3;

        const updatedPrize = await Prize.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ message: 'Prize updated successfully!', prize: updatedPrize });
    } catch (error) {
        res.status(500).json({ message: 'Error updating prize', error });
    }
};