import AdminTestimonial from '../../models/admin/adminTestimonial.js'; // Ensure correct import

export const getAllTestimonialsForAdmin = async (req, res) => {
    try {
        const testimonials = await AdminTestimonial.find(); // Fetch all testimonials
        res.status(200).json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Error fetching testimonials.' });
    }
};

export const approveTestimonial = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTestimonial = await AdminTestimonial.findByIdAndUpdate(id, { approved: true }, { new: true });
        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found.' });
        }
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        console.error('Error approving testimonial:', error);
        res.status(500).json({ message: 'Error approving testimonial.' });
    }
};

export const deleteTestimonial = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTestimonial = await AdminTestimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found.' });
        }
        res.status(200).json({ message: 'Testimonial deleted successfully.' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ message: 'Error deleting testimonial.' });
    }
};
