import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Units from "../pages/Units";
import Fields from "../pages/Fields";
import Championships from "../pages/Championships";
import Teams from "../pages/Teams";
import Enrollments from "../pages/Enrollments";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
          <Route path="/units" element={<Private Item={Units} />} />
          <Route path="/fields" element={<Private Item={Fields} />} />
          <Route
            path="/championships"
            element={<Private Item={Championships} />}
          />
          {/* <Route path="/teams" element={<Private Item={Teams} />} />
          <Route path="/enrollments" element={<Private Item={Enrollments} />} /> */}
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
