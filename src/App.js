import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import PostUser from './components/postUser/postUser';
import UpdateUser from './components/updateUser/updateUser';
import NoMatch from './components/noMatch/noMatch';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/user' element={<PostUser/>}></Route>
        <Route path='/user/:id' element={<UpdateUser/>}></Route>
        <Route path='*' element={<NoMatch/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
