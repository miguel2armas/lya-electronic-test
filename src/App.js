import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import './App.css';
import Home from "./components/home/home";
import Header from "./components/header";
import Footer from "./components/footer";
import {NotificationContainer} from 'react-notifications';
function App() {
  return (
    <div>
        <Header/>
        <Home/>
        <Footer/>
        <NotificationContainer/>
    </div>
  );
}

export default App;
