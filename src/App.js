import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';
import Category from './components/Category';
import Navbar from './components/Navbar';
import Footer from './components/footer';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>

        
        <Pages />
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}



export default App;