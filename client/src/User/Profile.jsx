// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './Profile.css';

// // const EditProfile = () => {
// //   const [profile, setProfile] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     address: ''
// //   });

// //   const [isEditing, setIsEditing] = useState(false);

// //   // Fetch user profile data when the component mounts
// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const response = await axios.get('/api/user/profile');
// //         setProfile(response.data);
// //       } catch (error) {
// //         console.error('Error fetching profile data:', error);
// //       }
// //     };

// //     fetchProfile();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfile({ ...profile, [name]: value });
// //   };

// //   const handleSave = async () => {
// //     try {
// //       await axios.put('/api/user/profile', profile);
// //       setIsEditing(false);
// //     } catch (error) {
// //       console.error('Error updating profile data:', error);
// //     }
// //   };

// //   const handleEdit = () => {
// //     setIsEditing(true);
// //   };

// //   return (
// //     <div className="edit-profile">
// //       <h1>Edit Profile</h1>
// //       <form>
// //         <div className="form-group">
// //           <label htmlFor="name">Name</label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={profile.name}
// //             onChange={handleChange}
// //             disabled={!isEditing}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             name="email"
// //             value={profile.email}
// //             onChange={handleChange}
// //             disabled={!isEditing}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="phone">Phone</label>
// //           <input
// //             type="tel"
// //             id="phone"
// //             name="phone"
// //             value={profile.phone}
// //             onChange={handleChange}
// //             disabled={!isEditing}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="address">Address</label>
// //           <textarea
// //             id="address"
// //             name="address"
// //             value={profile.address}
// //             onChange={handleChange}
// //             disabled={!isEditing}
// //           ></textarea>
// //         </div>
// //         {isEditing ? (
// //           <button type="button" onClick={handleSave}>
// //             Save
// //           </button>
// //         ) : (
// //           <button type="button" onClick={handleEdit}>
// //             Edit
// //           </button>
// //         )}
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditProfile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [formData, setFormData] = useState(new FormData());
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('/api/user'); // Adjust URL as needed
//         setUser(response.data);
//       } catch (err) {
//         console.error(err);
//         navigate('/login');
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'pp' && files.length > 0) {
//       formData.set(name, files[0]);
//     } else {
//       formData.set(name, value);
//     }
//     setFormData(new FormData(formData)); // Update formData
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/edit', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccess('Profile updated successfully');
//     } catch (err) {
//       setError('Failed to update profile');
//     }
//   };

//   const handleHomeClick = () => {
//     navigate('/home');
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <form className="shadow w-450 p-3" onSubmit={handleSubmit} encType="multipart/form-data">
//         <h4 className="display-4 fs-1">Edit Profile</h4><br />

//         {/* Error Message */}
//         {error && (
//           <div className="alert alert-danger" role="alert">
//             {error}
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="alert alert-success" role="alert">
//             {success}
//           </div>
//         )}

//         <div className="mb-3">
//           <label className="form-label">Full Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="fname"
//             defaultValue={user.fname}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">User Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="uname"
//             defaultValue={user.username}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Profile Picture</label>
//           <input
//             type="file"
//             className="form-control"
//             name="pp"
//             onChange={handleInputChange}
//           />
//           {user.pp && (
//             <img
//               src={`/upload/${user.pp}`}
//               className="rounded-circle"
//               style={{ width: '70px' }}
//               alt="Profile"
//             />
//           )}
//           <input
//             type="hidden"
//             name="old_pp"
//             value={user.pp}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Update</button>
//         <button type="button" className="link-secondary" onClick={handleHomeClick}>Home</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
