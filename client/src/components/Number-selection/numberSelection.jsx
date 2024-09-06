
// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { selectNumber } from '../../redux/lotterySlice';
// // import './NumberSelection.css';

// // const NumberSelection = () => {
// //     const dispatch = useDispatch();
// //     const selectedNumber = useSelector(state => state.lottery.selectedNumber);

// //     const handleNumberClick = (number) => {
// //         dispatch(selectNumber(number));
// //     };

// //     const renderNumbers = () => {
// //         const rows = [
// //             Array.from({ length: 13 }, (_, i) => i),
// //             Array.from({ length: 13 }, (_, i) => i + 13),
// //             Array.from({ length: 13 }, (_, i) => i + 26),
// //             Array.from({ length: 13 }, (_, i) => i + 39),
// //             Array.from({ length: 13 }, (_, i) => i + 52),
// //             Array.from({ length: 11 }, (_, i) => i + 65),
// //             Array.from({ length: 5 }, (_, i) => i + 76),
// //         ];

// //         return rows.map((row, rowIndex) => (
// //             <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
// //                 {row.map(num => (
// //                     <div
// //                         key={num}
// //                         className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
// //                         onClick={() => handleNumberClick(num)}
// //                     >
// //                         {num}
// //                     </div>
// //                 ))}
// //             </div>
// //         ));
// //     };

// //     return (
// //         <div className="number-selection">
// //             <h2>Lottery Game</h2>
// //             <div className="number-grid">
// //                 {renderNumbers()}
// //             </div>
// //         </div>
// //     );
// // };

// // export default NumberSelection;

// // src/components/NumberSelection.js
// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { selectNumber } from '../../redux/lotterySlice';
// // import './NumberSelection.css';

// // const NumberSelection = () => {
// //   const dispatch = useDispatch();
// //   const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

// //   const handleNumberClick = (number) => {
// //     dispatch(selectNumber(number));
// //   };

// //   const renderNumbers = () => {
// //     const rows = [
// //       Array.from({ length: 13 }, (_, i) => i),
// //       Array.from({ length: 13 }, (_, i) => i + 13),
// //       Array.from({ length: 13 }, (_, i) => i + 26),
// //       Array.from({ length: 13 }, (_, i) => i + 39),
// //       Array.from({ length: 13 }, (_, i) => i + 52),
// //       Array.from({ length: 11 }, (_, i) => i + 65),
// //       Array.from({ length: 5 }, (_, i) => i + 76),
// //     ];

// //     return rows.map((row, rowIndex) => (
// //       <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
// //         {row.map(num => (
// //           <div
// //             key={num}
// //             className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
// //             onClick={() => handleNumberClick(num)}
// //             style={{ cursor: selectedNumber === num ? 'default' : 'pointer' }}
// //           >
// //             {num}
// //           </div>
// //         ))}
// //       </div>
// //     ));
// //   };

// //   return (
// //     <div className="number-selection">
// //       <h2>Lottery Game</h2>
// //       <div className="number-grid">
// //         {renderNumbers()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NumberSelection;
// // import React, {useState, useEffect} from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { selectNumber } from '../../redux/lotterySlice';
// // import './NumberSelection.css';
// // import axios from 'axios';

// // const NumberSelection = () => {
// //   const dispatch = useDispatch();
// //   const selectedNumber = useSelector((state) => state.lottery.selectedNumber);
// //   const [numbers, setNumbers] = useState([]);
  
  

// //   const handleNumberClick = async (number) => {
// //     dispatch(selectNumber(number));
// //     try {
// //       await axios.post(`http://localhost:8000/api/v1/lottery/selectNumber/${number}`);
     
// //     } catch (error) {
// //       console.error('Error selecting number:', error);
// //     }
// //   };
// //   useEffect(() => {
// //     const fetchNumbers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
// //         setNumbers(response.data);
// //       } catch (error) {
// //         console.error('Error fetching available numbers:', error);
// //       }
// //     };

// //     fetchNumbers();
// //   }, []);


// //   const renderNumbers = () => {
// //     const rows = [
// //       Array.from({ length: 13 }, (_, i) => i),
// //       Array.from({ length: 13 }, (_, i) => i + 13),
// //       Array.from({ length: 13 }, (_, i) => i + 26),
// //       Array.from({ length: 13 }, (_, i) => i + 39),
// //       Array.from({ length: 13 }, (_, i) => i + 52),
// //       Array.from({ length: 11 }, (_, i) => i + 65),
// //       Array.from({ length: 5 }, (_, i) => i + 76),
// //     ];

// //     return rows.map((row, rowIndex) => (
// //       <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
// //         {row.map(num => (
// //           <div
// //             key={num}
// //             className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
// //             onClick={() => handleNumberClick(num)}
// //             style={{ cursor: selectedNumber === num ? 'default' : 'pointer' }}
// //           >
// //             {num}
// //           </div>
// //         ))}
// //       </div>
// //     ));
// //   };

// //   return (
// //     <div className="number-selection container">
// //       <h2>Lottery Game</h2>
// //       <div className="number-grid">
// //         {renderNumbers()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NumberSelection;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { selectNumber } from '../../redux/lotterySlice';
// // import './NumberSelection.css';

// // const NumberSelection = () => {
// //   const [numbers, setNumbers] = useState([]);
// //   const dispatch = useDispatch();
// //   const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

// //   // Fetch available numbers from the backend
// //   useEffect(() => {
// //     const fetchNumbers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
// //         setNumbers(response.data);
// //       } catch (error) {
// //         console.error('Error fetching numbers:', error);
// //       }
// //     };

// //     fetchNumbers();
// //   }, []);

// //   // Handle number selection and post it to the backend
// //   const handleNumberClick = async (number) => {
// //     // Avoid selecting already selected numbers
// //     const isSelected = numbers.find(n => n.number === number)?.selected;

// //     if (isSelected) {
// //       // Optionally handle unselecting logic
// //       return;
// //     }

// //     dispatch(selectNumber(number));
// //     try {
// //       const response = await axios.post(`http://localhost:8000/api/v1/lottery/selectNumber/${number}`, { number });
// //       if (response.status === 200) {
// //         console.log(`Number ${number} selected.`);
// //         // Optionally update the local state to reflect the new selection
// //         setNumbers(prevNumbers =>
// //           prevNumbers.map(n => n.number === number ? { ...n, selected: true } : n)
// //         );
// //       }
// //     } catch (error) {
// //       console.error('Error selecting number:', error);
// //     }
// //   };

// //   // Render the number grid
// //   const renderNumbers = () => {
// //     const rows = [
// //       Array.from({ length: 13 }, (_, i) => i + 1),
// //       Array.from({ length: 13 }, (_, i) => i + 14),
// //       Array.from({ length: 13 }, (_, i) => i + 27),
// //       Array.from({ length: 13 }, (_, i) => i + 40),
// //       Array.from({ length: 13 }, (_, i) => i + 53),
// //       Array.from({ length: 11 }, (_, i) => i + 66),
// //       Array.from({ length: 5 }, (_, i) => i + 77),
// //     ];

// //     return rows.map((row, rowIndex) => (
// //       <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
// //         {row.map(num => (
// //           <div
// //             key={num}
// //             className={`number-circle ${numbers.some(n => n.number === num && n.selected) ? 'selected' : ''}`}
// //             onClick={() => handleNumberClick(num)}
// //             style={{ cursor: numbers.some(n => n.number === num && n.selected) ? 'default' : 'pointer' }}
// //           >
// //             {num}
// //           </div>
// //         ))}
// //       </div>
// //     ));
// //   };

// //   return (
// //     <div className="number-selection container">
// //       <h2>Lottery Game</h2>
// //       <div className="number-grid">
// //         {renderNumbers()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NumberSelection;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './NumberSelection.css';

// // const NumberSelection = () => {
// //   const [numbers, setNumbers] = useState([]);

// //   // Fetch available numbers from the backend
// //   useEffect(() => {
// //     const fetchNumbers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
// //         setNumbers(response.data);
// //       } catch (error) {
// //         console.error('Error fetching numbers:', error);
// //       }
// //     };

// //     fetchNumbers();
// //   }, []);

// //   // Determine the number of columns
// //   const columnsPerRow = 13; // Assuming the company layout specifies 13 columns

// //   // Create a grid layout dynamically based on available numbers
// //   const renderNumbers = () => {
// //     const numberGrid = [];
// //     const totalNumbers = numbers.length;

// //     // Calculate how many rows we need
// //     const rows = Math.ceil(totalNumbers / columnsPerRow);

// //     for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
// //       const startIndex = rowIndex * columnsPerRow;
// //       const endIndex = startIndex + columnsPerRow;
// //       const rowNumbers = numbers.slice(startIndex, endIndex);

// //       numberGrid.push(
// //         <div key={rowIndex} className="number-row">
// //           {rowNumbers.map(num => (
// //             <div
// //               key={num.number}
// //               className={`number-circle ${num.selected ? 'selected' : ''}`}
// //             >
// //               {num.number}
// //             </div>
// //           ))}
// //           {/* Fill the remaining space in the row if needed */}
// //           {rowNumbers.length < columnsPerRow && (
// //             Array.from({ length: columnsPerRow - rowNumbers.length }).map((_, index) => (
// //               <div key={`empty-${index}`} className="number-circle empty"></div>
// //             ))
// //           )}
// //         </div>
// //       );
// //     }

// //     return numberGrid;
// //   };

// //   return (
// //     <div className="number-selection container">
// //       <h2>Lottery Game</h2>
// //       <div className="number-grid">
// //         {renderNumbers()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NumberSelection;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import './NumberSelection.css';


// // const NumberSelection = () => {
// //   const [numbers, setNumbers] = useState([]);
// //   const userEmail = useSelector((state) => state.auth.user?.email);

// //   // Fetch available numbers from the backend
// //   useEffect(() => {
// //     const fetchNumbers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
// //         setNumbers(response.data);
// //       } catch (error) {
// //         console.error('Error fetching numbers:', error);
// //       }
// //     };

// //     fetchNumbers();
// //   }, []);

// //   // Handle number selection
// //   // const handleNumberSelect = async (selectedNumber) => {
// //   //   try {
// //   //     await axios.post('http://localhost:8000/api/v1/lottery/selectNumber', {
// //   //       number: selectedNumber.number,
// //   //       email: userEmail, // Include the user's email
// //   //     });

// //   //     // Update the local state to reflect the selected number
// //   //     setNumbers((prevNumbers) =>
// //   //       prevNumbers.map((num) =>
// //   //         num.number === selectedNumber.number ? { ...num, selected: true, selectedBy: userEmail } : num
// //   //       )
// //   //     );
// //   //   } catch (error) {
// //   //     console.error('Error selecting number:', error);
// //   //   }
// //   // };
  

// //   const handleNumberSelect = async (selectedNumber) => {
// //       try {
// //           const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]; // Extract token from cookies
  
// //           const response = await axios.post('http://localhost:8000/api/v1/lottery/selectNumber/' + selectedNumber.number, {}, {
// //               headers: {
// //                   'Authorization': `Bearer ${token}` // Include token in the request headers
// //               }
// //           });
  
// //           // Update the local state to reflect the selected number
// //           setNumbers((prevNumbers) =>
// //               prevNumbers.map((num) =>
// //                   num.number === selectedNumber.number ? { ...num, selected: true, selectedBy: userEmail } : num
// //               )
// //           );
// //       } catch (error) {
// //           console.error('Error selecting number:', error);
// //       }
// //   };
  
// //   // Determine the number of columns
// //   const columnsPerRow = 13;

// //   // Create a grid layout dynamically based on available numbers
// //   const renderNumbers = () => {
// //     const numberGrid = [];
// //     const totalNumbers = numbers.length;

// //     // Calculate how many rows we need
// //     const rows = Math.ceil(totalNumbers / columnsPerRow);

// //     for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
// //       const startIndex = rowIndex * columnsPerRow;
// //       const endIndex = startIndex + columnsPerRow;
// //       const rowNumbers = numbers.slice(startIndex, endIndex);

// //       numberGrid.push(
// //         <div key={rowIndex} className="number-row">
// //           {rowNumbers.map((num) => (
// //             <div
// //               key={num.number}
// //               className={`number-circle ${num.selected ? 'selected' : ''}`}
// //               onClick={() => handleNumberSelect(num)} // Handle number selection
// //             >
// //               {num.number}
// //               {num.selected && <span className="email-label">({num.selectedBy})</span>} {/* Display the email */}
// //             </div>
// //           ))}
// //           {/* Fill the remaining space in the row if needed */}
// //           {rowNumbers.length < columnsPerRow &&
// //             Array.from({ length: columnsPerRow - rowNumbers.length }).map((_, index) => (
// //               <div key={`empty-${index}`} className="number-circle empty"></div>
// //             ))}
// //         </div>
// //       );
// //     }

// //     return numberGrid;
// //   };

// //   return (
// //     <div className="number-selection container">
// //       <h2>Lottery Game</h2>
// //       <div className="number-grid">{renderNumbers()}</div>
// //     </div>
// //   );
// // };

// // export default NumberSelection;

// const NumberSelection = ({ onSelect }) => {
//   const [numbers, setNumbers] = useState([]);

//   // Fetch available numbers from the backend
//   useEffect(() => {
//     const fetchNumbers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
//         setNumbers(response.data);
//       } catch (error) {
//         console.error('Error fetching numbers:', error);
//       }
//     };

//     fetchNumbers();
//   }, []);

//   // Render the numbers in a grid layout
//   const renderNumbers = () => {
//     const columnsPerRow = 13;
//     const numberGrid = [];
//     const totalNumbers = numbers.length;
//     const rows = Math.ceil(totalNumbers / columnsPerRow);

//     for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
//       const startIndex = rowIndex * columnsPerRow;
//       const endIndex = startIndex + columnsPerRow;
//       const rowNumbers = numbers.slice(startIndex, endIndex);

//       numberGrid.push(
//         <div key={rowIndex} className="number-row">
//           {rowNumbers.map((num) => (
//             <div
//               key={num.number}
//               className={`number-circle ${num.selected ? 'selected' : ''}`}
//               onClick={() => onSelect(num.number)} // Handle number selection
//             >
//               {num.number}
//             </div>
//           ))}
//           {rowNumbers.length < columnsPerRow &&
//             Array.from({ length: columnsPerRow - rowNumbers.length }).map((_, index) => (
//               <div key={`empty-${index}`} className="number-circle empty"></div>
//             ))}
//         </div>
//       );
//     }

//     return numberGrid;
//   };

//   return (
//     <div className="number-selection container">
//       <h2>Select a Number</h2>
//       <div className="number-grid">{renderNumbers()}</div>
//     </div>
//   );
// };

// export default NumberSelection;
















