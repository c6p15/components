import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomizerPage from "./pages/RandomizerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/randomizer' element={<RandomizerPage/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
