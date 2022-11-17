import EnrollmentBox from "../../components/Enrollments";
import * as C from "./styles";
import ColorSchemesExample from "../../components/Navbar";

const Enrollments = () => {
  return (
    <C.Container>
      <ColorSchemesExample variant="light" />
      <EnrollmentBox />
    </C.Container>
  );
};

export default Enrollments;
