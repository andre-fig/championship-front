import FieldBox from "../../components/Fields";
import * as C from "./styles";
import ColorSchemesExample from "../../components/Navbar";

const Fields = () => {
  return (
    <C.Container>
      <ColorSchemesExample variant="light" />
      <FieldBox />
    </C.Container>
  );
};

export default Fields;
