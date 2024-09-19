// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminLog.css';

// const AdminLogs = () => {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const response = await axios.get('/admin/logs');
//         setLogs(response.data);
//       } catch (error) {
//         console.error('Error fetching logs:', error);
//       }
//     };

//     fetchLogs();
//   }, []);

//   return (
//     <div className="table-container">
//       <h2>Admin Activity Logs</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Admin</th>
//             <th>Action</th>
//             <th>Entity</th>
//             <th>Details</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log) => (
//             <tr key={log._id}>
//               <td>{log.adminId.name} ({log.adminId.email})</td>
//               <td>{log.actionType}</td>
//               <td>{log.entity}</td>
//               <td>
//                 {log.actionType === 'create' && <pre>{JSON.stringify(log.newData, null, 2)}</pre>}
//                 {log.actionType === 'update' && (
//                   <div>
//                     <strong>Old:</strong> <pre>{JSON.stringify(log.oldData, null, 2)}</pre>
//                     <strong>New:</strong> <pre>{JSON.stringify(log.newData, null, 2)}</pre>
//                   </div>
//                 )}
//                 {log.actionType === 'delete' && <pre>{JSON.stringify(log.oldData, null, 2)}</pre>}
//               </td>
//               <td>{new Date(log.timestamp).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminLogs;
