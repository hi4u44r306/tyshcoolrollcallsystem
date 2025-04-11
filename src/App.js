import './App.css';
import QRBatchGenerator from './QRCodeGenerator';
import QRScanner from './QRScanner';
function App() {
  return (
    <div className="App">
      <QRScanner />
      <QRBatchGenerator />
    </div>
  );
}

export default App;
