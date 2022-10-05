import "./App.css";
import Header from "./components/Header";
import UnityBox from "./components/Unity";

function App() {
  return (
    <div className="container">
      <Header title="Sistema de Gerenciamento de Campeonatos" />
      <br />
      <UnityBox />
    </div>
  );
}

export default App;
