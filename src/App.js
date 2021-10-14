import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Home from "./components/home/home";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div>
        <Header/>
        <Home/>
        <Footer/>
    </div>
  );
}

export default App;
