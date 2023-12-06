import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ProtectedRoutes from './pages/ProtectedRoutes';
import AppDashboard from './pages/AppDashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/app" element={<AppDashboard />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
