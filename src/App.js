import {Routes,Route} from "react-router-dom"
import { Create } from './components/create';
import { Edit } from './components/edit';
import "./App.css"


function App() {
  return (
    <div className="App">
    <Routes>
     <Route path='/' element={<Create/>}></Route>
     
     <Route path='/edit/:id' element={<Edit/>}></Route>
    
   </Routes>
   
 </div>
  );
}

export default App;
