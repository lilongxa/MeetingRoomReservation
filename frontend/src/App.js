import React from 'react';
import routes from './routes';
import { BrowserRouter as Router, Route, Routes,useRoutes } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";
import { AuthProvider } from './auth/AuthContext';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="./" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }
function App() {
  var content = useRoutes(routes);

  return (
    <>
      <AuthProvider>
        <ConfirmProvider>
          {content}
        </ConfirmProvider>
      </AuthProvider>
    </>
  );
}
export default App;