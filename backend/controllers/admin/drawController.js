import Draw from '../../models/admin/draw.js';



// Fetch historical draws
export const getHistoricalDraws = async (req, res) => {
  try {
    const historicalDraws = await Draw.find({ status: 'Completed' }).populate('winner');
    res.status(200).json(historicalDraws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status to completed when a draw finishes
export const completeDraw = async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);
    if (!draw) return res.status(404).json({ error: 'Draw not found' });

    draw.status = 'Completed';
    await draw.save();

    res.status(200).json(draw);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new draw
export const createDraw = async (req, res) => {
    try {
      const { date, time, status } = req.body;
      console.log('Received data:', { date, time, status });
  
      const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        console.error('Invalid status value:', status);
        return res.status(400).json({ error: 'Invalid status value' });
      }
  
      const draw = new Draw({ date, time, status });
      await draw.save();
  
      res.status(201).json(draw);
    } catch (error) {
      console.error('Error creating draw:', error.message);
      res.status(400).json({ error: 'Failed to create draw', details: error.message });
    }
  };
  
  
  
  

// Get all draws with populated winner details
export const getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find();
    res.status(200).json(draws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a draw
export const updateDraw = async (req, res) => {
  try {
    const draw = await Draw.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('winner');
    if (!draw) return res.status(404).json({ error: 'Draw not found' });
    res.status(200).json(draw);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a draw
export const deleteDraw = async (req, res) => {
  try {
    const draw = await Draw.findByIdAndDelete(req.params.id);
    if (!draw) return res.status(404).json({ error: 'Draw not found' });
    res.status(200).json({ message: 'Draw deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
