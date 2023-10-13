
import './App.css';
import CarForm from './Components/CarForm/CarForm';
import { Link, NavLink, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div >

      {/* <Link to="/cars">Cars</Link> */}
      <NavLink to="/cars">Cars</NavLink>
      {/* <CarForm /> */}

      <Routes>
        {/* <Route path='/' element={null} /> */}
        <Route path='/cars' element={<CarForm />} />
      </Routes>
    </div>
  );
}

export default App;
