import React from 'react';
import routes from './routes';
import { BrowserRouter as Router, Route, Routes,useRoutes } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";
import { AuthProvider } from './auth/AuthContext';
import { NotificationProvider } from "./components/NotificationProvider";

function App() {
  var content = useRoutes(routes);

  return (
    <>
      <AuthProvider>
        <ConfirmProvider>
          <NotificationProvider>
              {content}
          </NotificationProvider>
        </ConfirmProvider>
      </AuthProvider>
    </>
  );
}
export default App;