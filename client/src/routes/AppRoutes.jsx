import { Routes, Route } from 'react-router-dom';

import RequireAuth from "../contex/AuthenticationContex/RequireAuth";
import TodoPage from '../pages/TodoPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import PageNotFound from '../pages/PageNotFound';


function AppRoutes(props) {

  return (

    <Routes>

        <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default AppRoutes;
