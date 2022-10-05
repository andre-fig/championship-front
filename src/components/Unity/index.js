import React, { Component } from "react";
import { Table, Button } from "reactstrap";

class FormUnity extends Component {
  render() {
    return <div></div>;
  }
}

class ListUnity extends Component {
  render() {
    const { units } = this.props;
    console.log(units);
    return (
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.id}</td>
              <td>{unit.name}</td>
              <td>
                <Button color="info" size="sm">
                  Editar
                </Button>
                <Button color="info" size="sm">
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default class UnityBox extends Component {
  Url = "https://mack-championship-api.herokuapp.com/units";

  state = {
    units: [],
  };

  componentDidMount() {
    fetch(this.Url)
      .then((response) => response.json())
      .then((units) => this.setState({ units }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h2 className="font-weight-bold text-center">
            Formulário de Unidades
          </h2>
          <FormUnity />
        </div>

        <div className="col-md-6">
          <h2 className="font-weight-bold text-center">Lista de Unidades</h2>
          <ListUnity units={this.state.unis} />
        </div>
      </div>
    );
  }
}
