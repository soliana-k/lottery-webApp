
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectNumber } from '../../redux/lotterySlice';
// import './NumberSelection.css';

// const NumberSelection = () => {
//     const dispatch = useDispatch();
//     const selectedNumber = useSelector(state => state.lottery.selectedNumber);

//     const handleNumberClick = (number) => {
//         dispatch(selectNumber(number));
//     };

//     const renderNumbers = () => {
//         const rows = [
//             Array.from({ length: 13 }, (_, i) => i),
//             Array.from({ length: 13 }, (_, i) => i + 13),
//             Array.from({ length: 13 }, (_, i) => i + 26),
//             Array.from({ length: 13 }, (_, i) => i + 39),
//             Array.from({ length: 13 }, (_, i) => i + 52),
//             Array.from({ length: 11 }, (_, i) => i + 65),
//             Array.from({ length: 5 }, (_, i) => i + 76),
//         ];

//         return rows.map((row, rowIndex) => (
//             <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
//                 {row.map(num => (
//                     <div
//                         key={num}
//                         className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
//                         onClick={() => handleNumberClick(num)}
//                     >
//                         {num}
//                     </div>
//                 ))}
//             </div>
//         ));
//     };

//     return (
//         <div className="number-selection">
//             <h2>Lottery Game</h2>
//             <div className="number-grid">
//                 {renderNumbers()}
//             </div>
//         </div>
//     );
// };

// export default NumberSelection;

// src/components/NumberSelection.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectNumber } from '../../redux/lotterySlice';
// import './NumberSelection.css';

// const NumberSelection = () => {
//   const dispatch = useDispatch();
//   const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

//   const handleNumberClick = (number) => {
//     dispatch(selectNumber(number));
//   };

//   const renderNumbers = () => {
//     const rows = [
//       Array.from({ length: 13 }, (_, i) => i),
//       Array.from({ length: 13 }, (_, i) => i + 13),
//       Array.from({ length: 13 }, (_, i) => i + 26),
//       Array.from({ length: 13 }, (_, i) => i + 39),
//       Array.from({ length: 13 }, (_, i) => i + 52),
//       Array.from({ length: 11 }, (_, i) => i + 65),
//       Array.from({ length: 5 }, (_, i) => i + 76),
//     ];

//     return rows.map((row, rowIndex) => (
//       <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
//         {row.map(num => (
//           <div
//             key={num}
//             className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
//             onClick={() => handleNumberClick(num)}
//             style={{ cursor: selectedNumber === num ? 'default' : 'pointer' }}
//           >
//             {num}
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   return (
//     <div className="number-selection">
//       <h2>Lottery Game</h2>
//       <div className="number-grid">
//         {renderNumbers()}
//       </div>
//     </div>
//   );
// };

// export default NumberSelection;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNumber } from '../../redux/lotterySlice';
import './NumberSelection.css';

const NumberSelection = () => {
  const dispatch = useDispatch();
  const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

  const handleNumberClick = (number) => {
    dispatch(selectNumber(number));
  };

  const renderNumbers = () => {
    const rows = [
      Array.from({ length: 13 }, (_, i) => i),
      Array.from({ length: 13 }, (_, i) => i + 13),
      Array.from({ length: 13 }, (_, i) => i + 26),
      Array.from({ length: 13 }, (_, i) => i + 39),
      Array.from({ length: 13 }, (_, i) => i + 52),
      Array.from({ length: 11 }, (_, i) => i + 65),
      Array.from({ length: 5 }, (_, i) => i + 76),
    ];

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
        {row.map(num => (
          <div
            key={num}
            className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
            onClick={() => handleNumberClick(num)}
            style={{ cursor: selectedNumber === num ? 'default' : 'pointer' }}
          >
            {num}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="number-selection container">
      <h2>Lottery Game</h2>
      <div className="number-grid">
        {renderNumbers()}
      </div>
    </div>
  );
};

export default NumberSelection;
