import "./App.css";
import FieldBox from "./components/Field";
import Header from "./components/Header";
import UnityBox from "./components/Unity";

function App() {
  return (
    <div className="container">
      <Header title="Sistema de Gerenciamento de Campeonatos" />
      <br />
      <UnityBox />
      <br />
      <FieldBox />
    </div>
  );
}

export default App;
