import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Error from './pages/Error';
import PDFChat from './pages/PDFChat';
import TextChat from './pages/TextChat';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>} errorElement= {<Error/>}>
      <Route index element= {<PDFChat/> }/>
      <Route path="text" element= {<TextChat/> }/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
