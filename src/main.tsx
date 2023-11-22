import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './ultis/redux/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import SignIn from './pages/SignIn.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/app" element={<Dashboard />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
