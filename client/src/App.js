import './styles/App.css';
import { BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
