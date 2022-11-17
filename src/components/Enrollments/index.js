import React, { Component } from "react";
import PubSub from "pubsub-js";

import { Table, Alert } from "reactstrap";

import { Button, Box, TextField } from "@mui/material";

class FormField extends Component {
  state = {
    model: {
      id: 0,
      unity: "",
      identifier: "",
    },
  };

  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };

  create = () => {
    document.getElementById(
      "fieldRegistrationButton"
    ).textContent = `Cadastrar quadra`;
    this.setState({
      model: { id: 0, unity: "", identifier: "" },
    });
    if (this.state.model.identifier === "") {
      alert("Preencha o campo identificador");
    } else {
      this.props.fieldCreate(this.state.model);
    }
  };

  componentWillMount() {
    PubSub.subscribe("edit-field", (topic, field) => {
      this.setState({ model: field });
    });
  }

  render() {
    return (
      <Box>
        <div>
          <TextField
            label="Id. da Unidade"
            id="unity"
            type="text"
            value={this.state.model.unity}
            placeholder="Unidade da quadra"
            onChange={(e) => this.setValues(e, "unity")}
          />

          <TextField
            label="Identificador"
            id="identifier"
            type="text"
            value={this.state.model.identifier}
            placeholder="Identificador da quadra"
            onChange={(e) => this.setValues(e, "identifier")}
          />
        </div>
        <Button id="saveButton" variant="contained" onClick={this.create}>
          {" "}
          Salvar{" "}
        </Button>
      </Box>
    );
  }
}

class ListField extends Component {
  delete = (id) => {
    this.props.deleteField(id);
  };

  onEdit = (field) => {
    document.getElementById(
      "fieldRegistrationButton"
    ).textContent = `Atualizar a quadra ${field.identifier}`;
    // document.getElementById("saveButton").textContent = `Salvar alterações`;
    document.getElementById("identifier").focus();

    PubSub.publish("edit-field", field);
  };

  render() {
    const { fields } = this.props;

    return (
      <Table className="table-bordered text-center align-middle">
        <thead className="thead-dark">
          <tr>
            <th>Unidade</th>
            <th>Identificador</th>
            <th colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id}>
              <td>{field.unity}</td>
              <td>{field.identifier}</td>
              <td>
                <Button variant="contained" onClick={(e) => this.onEdit(field)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={(e) => this.delete(field.id)}
                >
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

export default class FieldBox extends Component {
  //   Url = "http://localhost:3001/fields";
  Url = "https://mack-championship-api.herokuapp.com/fields";

  state = {
    fields: [],
    message: {
      text: "",
      alert: "",
    },
  };

  componentDidMount() {
    fetch(this.Url)
      .then((response) => response.json())
      .then((fields) => this.setState({ fields }))
      .catch((e) => console.log(e));
  }

  edit = (field) => {
    if (field.id !== 0) {
      document.getElementById("fieldRegistrationButton").textContent =
        "Atualizar quadras";
    } else {
      document.getElementById("fieldRegistrationButton").textContent =
        "Cadastrar quadras";
    }
    this.setState({ field });
  };

  save = (field) => {
    let data = {
      id: parseInt(field.id),
      identifier: field.identifier,
      unity: field.unity,
    };

    const requestInfo = {
      method: data.id !== 0 ? "PUT" : "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };

    if (data.id === 0) {
      fetch(this.Url, requestInfo)
        .then((response) => response.json())
        .then((newField) => {
          let { fields } = this.state;
          fields.push(newField);
          this.setState({
            fields,
            // message: {
            //   text: "Nova quadra adicionada com sucesso!",
            //   alert: "success",
            // },
          });
          this.timerMessage(3000);
        })
        .catch((e) => console.log(e));
    } else {
      fetch(`${this.Url}/${data.id}`, requestInfo)
        .then((response) => response.json())
        .then((updatedField) => {
          let { fields } = this.state;
          let position = fields.findIndex((field) => field.id === data.id);
          fields[position] = updatedField;
          this.setState({
            fields,
            // message: { text: "Quadra atualizada com sucesso!", alert: "info" },
          });
          this.timerMessage(3000);
        })
        .catch((e) => console.log(e));
    }
  };

  delete = (id) => {
    fetch(`${this.Url}/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((rows) => {
        const fields = this.state.fields.filter((field) => field.id !== id);
        this.setState({
          fields,
          //   message: { text: "Quadra apagada com sucesso.", alert: "danger" },
        });
        this.timerMessage(3000);
      })
      .catch((e) => console.log(e));
  };

  timerMessage = (duration) => {
    setTimeout(() => {
      this.setState({ message: { text: "", alert: "" } });
    }, duration);
  };

  render() {
    return (
      <div>
        {this.state.message.text !== "" ? (
          <Alert color={this.state.message.alert} className="text-center">
            {" "}
            {this.state.message.text}{" "}
          </Alert>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-md-6 my-3">
            <h2
              id="fieldRegistrationButton"
              className="font-weight-bold text-center"
            >
              {" "}
              Cadastrar quadra{" "}
            </h2>
            <FormField fieldCreate={this.save} edit={this.edit} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center"> Lista de quadras </h2>
            <ListField fields={this.state.fields} deleteField={this.delete} />
          </div>
        </div>
      </div>
    );
  }
}
