// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Sign from './Pages/SignPage';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Sign />} />
//         <Route path="/" element={<Sign />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './Pages/SignPage';
// import Login from './Pages/LoginPage'; // Your login component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignPage';
import Login from './Pages/LoginPage'; // Your login component
import HomePage from './Pages/HomePage'; // Import the Home component
// import AuthPage from './Pages/AuthPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} /> Add this line for Home page
      </Routes>
    </Router>
  );
}

export default App;
