import Testimonial from "../models/Testimonial";
// GET all testimonials for admin review
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({});
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Error fetching testimonials.' });
    }
};

// PUT endpoint to approve a testimonial
exports.approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found.' });
        }
        res.json(testimonial);
    } catch (error) {
        console.error('Error approving testimonial:', error);
        res.status(500).json({ message: 'Error approving testimonial.' });
    }
};

// DELETE endpoint to delete a testimonial
exports.deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ message: 'Error deleting testimonial.' });
    }
};
