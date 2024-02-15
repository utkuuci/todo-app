import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Me from './pages/me/Me';


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Me />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/me' element={<Me />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}
export default App;

function NotFound (){ 
  return (
    <h1>Not Found</h1>
  );
}