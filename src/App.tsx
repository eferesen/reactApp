import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CookieStorage from './components/CookieStorage'
import Header from './components/Header'
import Home from './components/Home';

import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path='cookieStorage' element={<CookieStorage />} />
    </Route>
  ),
  { basename: import.meta.env.DEV ? '/' : '/reactApp/' }
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
