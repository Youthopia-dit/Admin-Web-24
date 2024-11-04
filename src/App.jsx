import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Event from './pages/Event/Event';
import Payments from './pages/Payments/Payments';
import Login from './pages/Login/LoginPage';

const router = createHashRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/event/:id',
    element: <Event />,
  },
  {
    path: '/payments',
    element: <Payments />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
