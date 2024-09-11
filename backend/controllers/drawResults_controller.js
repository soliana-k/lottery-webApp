// import DrawResult from '../models/DrawResult.js';
// import Winner from '../models/Winner.js';


// // const generateRandomNumbers = (count, max) => {
// //     const numbers = new Set();
// //     while (numbers.size < count) {
// //         numbers.add(Math.floor(Math.random() * max) + 1);
// //     }
// //     return Array.from(numbers).sort((a, b) => a - b);
// // };
// // const generateRandomNumbers = (userNumbers, count) => {
// //     const numbers = new Set();
// //     while (numbers.size < count) {
// //       const randomIndex = Math.floor(Math.random() * userNumbers.length);
// //       numbers.add(userNumbers[randomIndex]);
// //     }
// //     return Array.from(numbers).sort((a, b) => a - b);
// //   };
  

// // export const getCurrentDraw = async (req, res) => {
// //     try {
// //         const latestDraw = await DrawResult.findOne().sort({ date: -1 }).exec();
// //         if (latestDraw) {
// //             return res.status(200).json(latestDraw);
// //         } else {
// //             return res.status(200).json({ numbers: generateRandomNumbers(6, 60) });
// //         }
// //     } catch (error) {
// //         console.error('Error fetching current draw:', error);
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // }
// //import DrawResult from '../models/DrawResult.js';
// import NumberSelection from '../models/number.js';

// export const getCurrentDraw = async (req, res) => {
//   try {
//     // Fetch selected numbers where payment is completed
//     const selectedNumbers = await NumberSelection.find({ selected: true, paymentCompleted: true });
    
//     if (selectedNumbers.length === 0) {
//       return res.status(200).json({ numbers: [], message: 'No numbers available for the draw' });
//     }

//     // Generate random numbers from selected ones
//     const drawNumbers = generateRandomNumbers(6, selectedNumbers.length)
//       .map(index => selectedNumbers[index].number);

//     // Save the draw result
//     const drawResult = new DrawResult({
//       date: new Date(),
//       numbers: drawNumbers,
//     });
//     await drawResult.save();

//     // Reset selected and paymentCompleted status
//     await NumberSelection.updateMany({ selected: true, paymentCompleted: true }, { selected: false, paymentCompleted: false });

//     return res.status(200).json({ numbers: drawNumbers });
//   } catch (error) {
//     console.error('Error fetching current draw:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// import Draw from '../../models/admin/draw.js';

// // Function to fetch the next upcoming draw based on the closest time
// export const getNextUpcomingDraw = async (req, res) => {
//   try {
//     const now = new Date();

//     // Find the next draw where the time is closest to the current time
//     const nextDraw = await Draw.findOne({ 
//       date: { $gte: now },
//       status: 'Upcoming'
//     }).sort({ date: 1 });

//     if (!nextDraw) {
//       return res.status(404).json({ error: 'No upcoming draws found' });
//     }

//     res.status(200).json(nextDraw);
//   } catch (error) {
//     console.error('Error fetching next upcoming draw:', error.message);
//     res.status(500).json({ error: 'Failed to fetch next upcoming draw' });
//   }
// };


// // Helper function to generate random indices
// const generateRandomNumbers = (count, max) => {
//   const indices = new Set();
//   while (indices.size < count) {
//     indices.add(Math.floor(Math.random() * max));
//   }
//   return Array.from(indices);
// };



// export const getPastResults = async (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     try {
//         const results = await DrawResult.find()
//             .skip((page - 1) * limit)
//             .limit(Number(limit))
//             .sort({ date: -1 })
//             .exec();
//         res.status(200).json(results);
//     } catch (error) {
//         console.error('Error fetching past results:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


// export const getWinnerAnnouncements = async (req, res) => {
//     try {
//         const winners = await Winner.find().sort({ date: -1 }).exec();
//         res.status(200).json(winners);
//     } catch (error) {
//         console.error('Error fetching winner announcements:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
import DrawResult from '../models/DrawResult.js';
import Winner from '../models/Winner.js';
import Draw from '../models/admin/draw.js';
import NumberSelection from '../models/number.js';

// Function to fetch the next upcoming draw based on the closest time
// export const getNextUpcomingDraw = async (req, res) => {
//   try {
//     const now = new Date();

//     // Find the next draw where the time is closest to the current time
//     const nextDraw = await Draw.findOne({ 
//       date: { $gte: now },
//       status: 'Upcoming'
//     }).sort({ date: 1 });

//     if (!nextDraw) {
//       return res.status(404).json({ error: 'No upcoming draws found' });
//     }

//     res.status(200).json(nextDraw);
//   } catch (error) {
//     console.error('Error fetching next upcoming draw:', error.message);
//     res.status(500).json({ error: 'Failed to fetch next upcoming draw' });
//   }
// };
// Function to fetch the closest upcoming draw from a list of upcoming draws
export const getClosestUpcomingDraw = async (req, res) => {
    try {
      const now = new Date();
  
      // Fetch all upcoming draws with date and time
      const upcomingDraws = await Draw.find({
        date: { $gte: now },
        status: 'Upcoming'
      }).sort({ date: 1 });
  
      if (upcomingDraws.length === 0) {
        return res.status(404).json({ error: 'No upcoming draws found' });
      }
  
      // Find the draw closest to the current time
      const closestDraw = upcomingDraws.reduce((closest, current) => {
        const closestDate = new Date(closest.date);
        const currentDate = new Date(current.date);
        const closestDiff = Math.abs(closestDate - now);
        const currentDiff = Math.abs(currentDate - now);
        return currentDiff < closestDiff ? current : closest;
      });
  
      res.status(200).json(closestDraw);
    } catch (error) {
      console.error('Error fetching closest upcoming draw:', error.message);
      res.status(500).json({ error: 'Failed to fetch closest upcoming draw' });
    }
  };
  

// Function to fetch the current draw and generate random numbers
export const getCurrentDraw = async (req, res) => {
  try {
    // Fetch selected numbers where payment is completed
    const selectedNumbers = await NumberSelection.find({ selected: true, paymentCompleted: true });

    if (selectedNumbers.length === 0) {
      return res.status(200).json({ numbers: [], message: 'No numbers available for the draw' });
    }

    // Generate random numbers from selected ones
    const drawNumbers = generateRandomNumbers(6, selectedNumbers.length)
      .map(index => selectedNumbers[index].number);

    // Identify the user who selected the winning numbers
    const winners = drawNumbers.map(number => {
      const winnerEntry = selectedNumbers.find(selection => selection.number === number);
      return {
        number: winnerEntry.number,
        selectedBy: winnerEntry.selectedBy // Store the user's email or ID
      };
    });

    // Save the draw result and winners to the DrawResult collection
    const drawResult = new DrawResult({
      date: new Date(),
      numbers: drawNumbers,
      winners: winners.map(w => ({
        number: w.number,
        selectedBy: w.selectedBy
      }))
    });
    await drawResult.save();

    // Reset selected and paymentCompleted status for the next draw
    await NumberSelection.updateMany({ selected: true, paymentCompleted: true }, { selected: false, paymentCompleted: false });

    return res.status(200).json({ numbers: drawNumbers, winners: winners });
  } catch (error) {
    console.error('Error fetching current draw:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Helper function to generate random indices
const generateRandomNumbers = (count, max) => {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
};

// Function to fetch past results
export const getPastResults = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const results = await DrawResult.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ date: -1 })
      .exec();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching past results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to fetch winner announcements
export const getWinnerAnnouncements = async (req, res) => {
  try {
    const winners = await Winner.find().sort({ date: -1 }).exec();
    res.status(200).json(winners);
  } catch (error) {
    console.error('Error fetching winner announcements:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Ensure path and export are correct

export const getCountdownDetails = async (req, res) => {
  try {
    // Fetch the next draw time from the database
    const drawDetails = await Draw.findOne({}).sort({ date: 1 }).exec();
    if (!drawDetails) {
      return res.status(404).json({ message: 'No draw details found' });
    }

    const { date, time } = drawDetails;
    const drawDate = new Date(date);
    const drawDateTimeString = `${drawDate.toISOString().split('T')[0]}T${time}:00Z`;
    const drawDateTime = new Date(drawDateTimeString);

    // Calculate the time remaining
    const now = new Date();
    const timeDifference = drawDateTime.getTime() - now.getTime();
    const timeRemainingSeconds = Math.max(Math.floor(timeDifference / 1000), 0);
    const minutesRemaining = Math.floor(timeRemainingSeconds / 60);
    const secondsRemaining = timeRemainingSeconds % 60;

    // Fetch selected numbers with completed payments
    const selectedNumbers = await NumberSelection.find({ selected: true, paymentCompleted: true });
    if (selectedNumbers.length === 0) {
      return res.status(400).json({ message: 'No numbers selected or payment not completed' });
    }

    // Generate a random number from the selected numbers
    const randomIndex = Math.floor(Math.random() * selectedNumbers.length);
    const randomNumber = selectedNumbers[randomIndex].number;
    const selectedBy = selectedNumbers[randomIndex].selectedBy; // Get the user who selected the number

    // Save the random number and winner to DrawResult
    const drawResult = new DrawResult({
      date: drawDateTime,
      numbers: [randomNumber],
      winners: [{ number: randomNumber, selectedBy }] // Save the winner details
    });
    await drawResult.save();

    // Respond with the countdown and random number
    res.status(200).json({
      countdown: {
        minutes: minutesRemaining,
        seconds: secondsRemaining
      },
      randomNumber,
      selectedBy  // Return the winner's details
    });
  } catch (error) {
    console.error('Error fetching countdown details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


