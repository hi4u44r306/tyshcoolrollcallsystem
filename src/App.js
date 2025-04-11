import './App.css';
import QRScanner from './QRScanner';
import StudentQRCodeGenerator from './StudentQRCodeGenerator';

function App() {
  return (
    <div className="App">
      <QRScanner />
      <StudentQRCodeGenerator />
    </div>
  );
}

export default App;
