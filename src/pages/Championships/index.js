import ChampionshipBox from "../../components/Championships";
import * as C from "./styles";
import ColorSchemesExample from "../../components/Navbar";

const Championships = () => {
  return (
    <C.Container>
      <ColorSchemesExample variant="light" />
      <ChampionshipBox />
    </C.Container>
  );
};

export default Championships;
