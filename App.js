import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import AddCoupon from "./pages/addCoupon";
import UpdateCoupon from "./pages/updateCoupon";
import Randomizer from "./pages/randomizer";
import Login from "./pages/loginpage";
import Register from "./pages/registerpage";
import "./components/InventoryStyle.css";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Randomizer' element={<Randomizer/>}/>
        <Route path='/Addcoupon' element={<AddCoupon/>}/>
        <Route path='/Updatecoupon/:id' element={<UpdateCoupon/>}/>
        <Route path='/Inventory' element={<Inventory/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
