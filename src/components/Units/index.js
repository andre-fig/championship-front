import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Alert } from "reactstrap";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TextField,
} from "@mui/material";

class FormUnity extends Component {
  state = {
    model: {
      id: 0,
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  };

  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };

  create = () => {
    document.getElementById(
      "registrationButton"
    ).textContent = `Cadastrar unidade`;
    this.setState({
      model: { id: 0, name: "", address: "", city: "", state: "", zipCode: "" },
    });
    if (this.state.model.name === "") {
      alert("Preencha o campo nome");
    } else if (
      this.state.model.zipCode.length > 0 &&
      this.state.model.zipCode.length < 8
    ) {
      alert("Preencha o campo CEP corretamente");
    } else {
      this.props.unityCreate(this.state.model);
    }
  };

  componentWillMount() {
    PubSub.subscribe("edit-unity", (topic, unity) => {
      this.setState({ model: unity });
    });
  }

  render() {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <TextField
            label="Nome"
            id="name"
            type="text"
            value={this.state.model.name}
            placeholder="Nome da unidade"
            onChange={(e) => this.setValues(e, "name")}
          />

          <TextField
            label="Endereço"
            id="address"
            type="text"
            value={this.state.model.address}
            placeholder="Endereço da unidade"
            onChange={(e) => this.setValues(e, "address")}
          />

          <TextField
            label="Cidade"
            id="city"
            type="text"
            value={this.state.model.city}
            placeholder="Nome da unidade"
            onChange={(e) => this.setValues(e, "city")}
          />

          <TextField
            label="Estado"
            id="state"
            type="text"
            maxLength={2}
            value={this.state.model.state}
            placeholder="Estado da unidade"
            onChange={(e) => this.setValues(e, "state")}
          />

          <TextField
            label="CEP"
            id="zipCode"
            type="number"
            value={this.state.model.zipCode}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-", ",", ".", "_", "/"].includes(evt.key) &&
              evt.preventDefault()
            }
            onInput={(e) => {
              if (e.target.value.length > 8) {
                e.target.value = e.target.value.slice(0, 8);
              }
            }}
            maxLength={8}
            placeholder="CEP da unidade"
            onChange={(e) => this.setValues(e, "zipCode")}
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

class ListUnity extends Component {
  delete = (id) => {
    this.props.deleteUnity(id);
  };

  onEdit = (unity) => {
    document.getElementById(
      "registrationButton"
    ).textContent = `Atualizar a unidade ${unity.name}`;
    // document.getElementById("saveButton").textContent = `Salvar alterações`;
    document.getElementById("name").focus();

    PubSub.publish("edit-unity", unity);
  };

  render() {
    const { units } = this.props;

    const printAddress = (address, city, state, zipCode) => {
      let addressText = address ? `${address}` : "";
      if (address && city) {
        addressText += `, ${city}`;
      } else if (city) {
        addressText += `${city}`;
      }
      addressText = state ? `${addressText} - ${state}` : addressText;
      if (address || city || state || zipCode) {
        addressText = addressText + ". ";
      }

      if (zipCode) {
        // const zipCodeFormatted = zipCode.replace(
        //   /(\d{2})(\d{3})(\d{3})/,
        //   "$1.$2-$3"
        // );

        // addressText = `${addressText}CEP: ${zipCodeFormatted}`;
        addressText = `${addressText}CEP: ${zipCode}`;
      }

      return addressText;
    };

    return (
      <Table className="table-bordered text-center align-middle">
        <TableHead className="thead-dark">
          <TableRow>
            <TableCell>Id.</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell colSpan={2}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units.map((unity) => (
            <TableRow key={unity.id}>
              <TableCell>{unity.id}</TableCell>
              <TableCell>{unity.name}</TableCell>
              <TableCell>
                {printAddress(
                  unity.address,
                  unity.city,
                  unity.state,
                  unity.zipCode
                )}
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={(e) => this.onEdit(unity)}>
                  Editar
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={(e) => this.delete(unity.id)}
                >
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default class UnityBox extends Component {
  //   Url = "http://localhost:3001/units";
  Url = "https://mack-championship-api.herokuapp.com/units";

  state = {
    units: [],
    message: {
      text: "",
      alert: "",
    },
  };

  componentDidMount() {
    fetch(this.Url)
      .then((response) => response.json())
      .then((units) => this.setState({ units }))
      .catch((e) => console.log(e));
  }

  edit = (unity) => {
    if (unity.id !== 0) {
      document.getElementById("registrationButton").textContent =
        "Atualizar unidades";
    } else {
      document.getElementById("registrationButton").textContent =
        "Cadastrar unidades";
    }
    this.setState({ unity });
  };

  save = (unity) => {
    let data = {
      id: parseInt(unity.id),
      name: unity.name,
      address: unity.address,
      city: unity.city,
      state: unity.state,
      zipCode: parseInt(unity.zipCode),
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
        .then((newUnity) => {
          let { units } = this.state;
          units.push(newUnity);
          this.setState({
            units,
            message: {
              text: "Nova unidade adicionada com sucesso!",
              alert: "success",
            },
          });
          this.timerMessage(3000);
        })
        .catch((e) => console.log(e));
    } else {
      fetch(`${this.Url}/${data.id}`, requestInfo)
        .then((response) => response.json())
        .then((updatedUnity) => {
          let { units } = this.state;
          let position = units.findIndex((unity) => unity.id === data.id);
          units[position] = updatedUnity;
          this.setState({
            units,
            message: { text: "Unidade atualizada com sucesso!", alert: "info" },
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
        const units = this.state.units.filter((unity) => unity.id !== id);
        this.setState({
          units,
          //   message: { text: "Unidade apagada com sucesso.", alert: "danger" },
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
              id="registrationButton"
              className="font-weight-bold text-center"
            >
              {" "}
              Cadastrar unidade{" "}
            </h2>
            <FormUnity unityCreate={this.save} edit={this.edit} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">
              {" "}
              Lista de unidades{" "}
            </h2>
            <ListUnity units={this.state.units} deleteUnity={this.delete} />
          </div>
        </div>
      </div>
    );
  }
}
