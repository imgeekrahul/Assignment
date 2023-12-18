import './App.css';
import HomePage from './component/HomePage/HomePage';
import MomentPage from './component/Moment/Header/Header';
import {Routes, Route, BrowserRouter} from 'react-router-dom';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/moment" element={<MomentPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
