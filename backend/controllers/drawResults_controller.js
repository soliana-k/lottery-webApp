import Draw from '../models/admin/draw.js';
import NumberSelection from '../models/number.js';
import DrawResult from '../models/DrawResult.js';
import Winner from '../models/Winner.js';

const generateRandomIndex = (max) => Math.floor(Math.random() * max);

// export const startDraw = async (req, res) => {
//   try {
//     const { drawId } = req.body; // Ensure drawId is provided in the request body

//     if (!drawId) {
//       return res.status(400).json({ error: 'Draw ID is required' });
//     }

//     // Fetch the draw details using the provided drawId
//     const drawDetails = await Draw.findById(drawId);

//     if (!drawDetails) {
//       return res.status(404).json({ error: 'Draw not found' });
//     }

//     // Fetch selected numbers where payment is completed
//     const selectedNumbers = await NumberSelection.find({
//       selected: true,
//       paymentCompleted: true
//     });

//     if (selectedNumbers.length === 0) {
//       return res.status(200).json({ numbers: [], message: 'No numbers available for the draw' });
//     }

//     // Generate a random draw index to select one number
//     const randomIndex = generateRandomIndex(selectedNumbers.length);
//     const winningNumber = selectedNumbers[randomIndex].number;
//     const winnerEntry = selectedNumbers[randomIndex];

//     // Create the draw result with only one winning number
//     const drawResult = new DrawResult({
//       drawId: drawDetails._id, // Use the fetched draw ID
//       drawDate: new Date(),
//       selectedNumbers: [{
//         number: winningNumber,
//         selectedBy: winnerEntry.selectedBy // Store the user's email or ID as a string
//       }],
//       status: 'Completed' // Mark the draw as completed
//     });

//     await drawResult.save();

//     // Reset the selected status for the next draw
//     await NumberSelection.updateMany(
//       { selected: true, paymentCompleted: true },
//       { selected: false, paymentCompleted: false }
//     );

//     res.status(200).json({ number: winningNumber, selectedBy: winnerEntry.selectedBy });
//   } catch (error) {
//     console.error('Error starting draw:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
export const startDraw = async (req, res) => {
  try {
    const { drawId } = req.body;

    if (!drawId) {
      return res.status(400).json({ error: 'Draw ID is required' });
    }

    const drawDetails = await Draw.findById(drawId);

    if (!drawDetails) {
      return res.status(404).json({ error: 'Draw not found' });
    }

    const prize = drawDetails.prize;

    const selectedNumbers = await NumberSelection.find({
      selected: true,
      paymentCompleted: true
    });

    if (selectedNumbers.length === 0) {
      return res.status(200).json({ numbers: [], message: 'No numbers available for the draw' });
    }

    const randomIndex = generateRandomIndex(selectedNumbers.length);
    const winningNumber = selectedNumbers[randomIndex].number;
    const winnerEntry = selectedNumbers[randomIndex];

    const drawResult = new DrawResult({
      drawId: drawDetails._id,
      drawDate: new Date(),
      selectedNumbers: [{
        number: winningNumber,
        selectedBy: winnerEntry.selectedBy
      }],
      prize: prize || null,
      winner: winnerEntry.selectedBy, // Add winner field
      status: 'Completed'
    });

    await drawResult.save();

    await NumberSelection.updateMany(
      { selected: true, paymentCompleted: true },
      { selected: false, paymentCompleted: false }
    );

    res.status(200).json({ number: winningNumber, selectedBy: winnerEntry.selectedBy, prize });
  } catch (error) {
    console.error('Error starting draw:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};





import moment from 'moment-timezone';


export const getClosestUpcomingDraw = async (req, res) => {
  try {
    // Get the current time in UTC
    const serverNow = new Date();
    console.log('Current time (server UTC):', serverNow);

    // Convert server time (UTC) to local time (Africa/Nairobi)
    const localNow = moment(serverNow).tz('Africa/Nairobi').toDate();
    console.log('Local time (EAT):', localNow);

    // Fetch upcoming draws with status 'Upcoming'
    const upcomingDraws = await Draw.find({ status: 'Upcoming' });

    if (!upcomingDraws || upcomingDraws.length === 0) {
      console.log('No upcoming draws found');
      return res.status(404).json({ error: 'No upcoming draws' });
    }

    const validDraws = upcomingDraws.filter((draw) => {
      // Combine date and time for each draw and convert to a full Date object in EAT timezone
      const drawDateTimeString = `${moment(draw.date).format('YYYY-MM-DD')} ${draw.time}`;
      const drawDateTime = moment.tz(drawDateTimeString, 'YYYY-MM-DD HH:mm', 'Africa/Nairobi').toDate();
      
      console.log('Draw date and time (EAT):', drawDateTime);
      return drawDateTime >= localNow;
    });

    if (validDraws.length === 0) {
      console.log('No valid upcoming draws found');
      return res.status(404).json({ error: 'No upcoming draws' });
    }

    // Sort valid draws by date and time to find the closest upcoming one
    const closestDraw = validDraws.sort((a, b) => {
      const aDateTime = moment.tz(`${moment(a.date).format('YYYY-MM-DD')} ${a.time}`, 'YYYY-MM-DD HH:mm', 'Africa/Nairobi').toDate();
      const bDateTime = moment.tz(`${moment(b.date).format('YYYY-MM-DD')} ${b.time}`, 'YYYY-MM-DD HH:mm', 'Africa/Nairobi').toDate();
      return aDateTime - bDateTime;
    })[0];

    // Return the closest draw details
    res.status(200).json({
      _id: closestDraw._id,
      date: closestDraw.date,
      time: closestDraw.time,
    });
  } catch (error) {
    console.error('Error fetching closest upcoming draw:', error.message);
    res.status(500).json({ error: 'Failed to fetch closest upcoming draw' });
  }
};




// Fetch countdown details
export const getCountdownDetails = async (req, res) => {
  try {
    const nowUTC = new Date(); // Get current time in UTC

    // Fetch the next upcoming draw
    const drawDetails = await Draw.findOne({
      date: { $gte: nowUTC },
      status: 'Upcoming'
    }).sort({ date: 1 });

    if (!drawDetails) {
      return res.status(404).json({ message: 'No upcoming draws found' });
    }

    // Ensure the draw time is correctly handled in UTC
    const drawDateUTC = new Date(drawDetails.date);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = drawDateUTC.getTime() - nowUTC.getTime();

    // If timeDifference is less than or equal to zero, trigger the draw
    if (timeDifferenceMs <= 0) {
      req.body.drawId = drawDetails._id;
      await startDraw(req, res); // Trigger the draw process
    } else {
      // Convert time difference to seconds, minutes, and hours
      const timeRemainingSeconds = Math.floor(timeDifferenceMs / 1000);
      const hoursRemaining = Math.floor(timeRemainingSeconds / 3600);
      const minutesRemaining = Math.floor((timeRemainingSeconds % 3600) / 60);
      const secondsRemaining = timeRemainingSeconds % 60;

      // Return the remaining time for the countdown
      return res.status(200).json({
        countdown: {
          hours: hoursRemaining,
          minutes: minutesRemaining,
          seconds: secondsRemaining
        }
      });
    }
  } catch (error) {
    console.error('Error fetching countdown details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Fetch past results
export const getPastResults = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const results = await DrawResult.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ drawDate: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching past results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch winner announcements
export const getWinnerAnnouncements = async (req, res) => {
  try {
    const winners = await Winner.find().sort({ date: -1 }).exec();
    res.status(200).json(winners);
  } catch (error) {
    console.error('Error fetching winner announcements:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
