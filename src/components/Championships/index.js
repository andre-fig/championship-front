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

class FormChampionship extends Component {
  state = {
    model: {
      id: 0,
      name: "",
      promotionStart: "",
      registrationStart: "",
      registrationEnd: "",
      status: "",
      unity: "",
    },
  };

  setValues = (e, championship) => {
    const { model } = this.state;
    model[championship] = e.target.value;
    this.setState({ model });
  };

  create = () => {
    document.getElementById(
      "registrationButton"
    ).textContent = `Cadastrar campeonato`;
    this.setState({
      model: {
        id: 0,
        name: "",
        promotionStart: "",
        registrationStart: "",
        registrationEnd: "",
        status: "",
        unity: "",
      },
    });
    if (this.state.model.name === "") {
      alert("Preencha o campo nome");
    } else {
      this.props.championshipCreate(this.state.model);
    }
  };

  componentWillMount() {
    PubSub.subscribe("edit-championship", (topic, championship) => {
      this.setState({ model: championship });
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
            placeholder="Nome da campeonato"
            onChange={(e) => this.setValues(e, "name")}
          />

          <TextField
            label="Data de início da promoção"
            id="promotionStart"
            type="date"
            InputLabelProps={{ shrink: true, required: true }}
            value={this.state.model.promotionStart}
            onChange={(e) => this.setValues(e, "promotionStart")}
          />

          <TextField
            label="Data de início da inscrição"
            id="registrationStart"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={this.state.model.registrationStart}
            onChange={(e) => this.setValues(e, "registrationStart")}
          />

          <TextField
            label="Data de término da inscrição"
            id="registrationEnd"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={this.state.model.registrationEnd}
            onChange={(e) => this.setValues(e, "registrationEnd")}
          />

          <TextField
            label="Status"
            id="status"
            type="text"
            value={this.state.model.status}
            placeholder="Status"
            onChange={(e) => this.setValues(e, "status")}
          />

          <TextField
            label="Unidade"
            id="unity"
            type="text"
            value={this.state.model.unity}
            placeholder="Unidade"
            onChange={(e) => this.setValues(e, "unity")}
          />
        </div>
        <div>
          <Button
            id="registrationButton"
            variant="contained"
            onClick={this.create}
          >
            Cadastrar campeonato
          </Button>
        </div>
      </Box>
    );
  }
}

class ListChampionship extends Component {
  delete = (id) => {
    this.props.deleteChampionship(id);
  };

  onEdit = (championship) => {
    document.getElementById(
      "registrationButton"
    ).textContent = `Atualizar a campeonato ${championship.name}`;
    // document.getElementById("saveButton").textContent = `Salvar alterações`;
    document.getElementById("name").focus();

    PubSub.publish("edit-championship", championship);
  };

  render() {
    const { championships } = this.props;

    return (
      <Table className="table-bordered text-center align-middle">
        <TableHead className="thead-dark">
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Data de início da promoção</TableCell>
            <TableCell>Data de início da inscrição</TableCell>
            <TableCell>Data de término da inscrição</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Unidade</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {championships.map((championship) => (
            <TableRow key={championship.id}>
              <TableCell>{championship.name}</TableCell>
              <TableCell>{championship.promotionStart}</TableCell>
              <TableCell>{championship.registrationStart}</TableCell>
              <TableCell>{championship.registrationEnd}</TableCell>
              <TableCell>{championship.status}</TableCell>
              <TableCell>{championship.unity}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => this.onEdit(championship)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  onClick={() => this.delete(championship.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default class ChampionshipBox extends Component {
  //   Url = "http://localhost:3001/championships";
  Url = "https://mack-championship-api.herokuapp.com/championships";

  state = {
    championships: [],
    message: {
      text: "",
      alert: "",
    },
  };

  componentDidMount() {
    fetch(this.Url)
      .then((response) => response.json())
      .then((championships) => this.setState({ championships }))
      .catch((e) => console.log(e));
  }

  edit = (championship) => {
    if (championship.id !== 0) {
      document.getElementById("registrationButton").textContent =
        "Atualizar campeonatos";
    } else {
      document.getElementById("registrationButton").textContent =
        "Cadastrar campeonatos";
    }
    this.setState({ championship });
  };

  save = (championship) => {
    let data = {
      id: parseInt(championship.id),
      name: championship.name,
      promotionStart: championship.promotionStart,
      registrationStart: championship.registrationStart,
      registrationEnd: championship.registrationEnd,
      status: championship.status,
      unity: championship.unity,
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
        .then((newChampionship) => {
          let { championships } = this.state;
          championships.push(newChampionship);
          this.setState({
            championships,
            message: {
              text: "Novo campeonato adicionada com sucesso!",
              alert: "success",
            },
          });
          this.timerMessage(3000);
        })
        .catch((e) => console.log(e));
    } else {
      fetch(`${this.Url}/${data.id}`, requestInfo)
        .then((response) => response.json())
        .then((updatedChampionship) => {
          let { championships } = this.state;
          let position = championships.findIndex(
            (championship) => championship.id === data.id
          );
          championships[position] = updatedChampionship;
          this.setState({
            championships,
            message: {
              text: "Campeonato atualizado com sucesso!",
              alert: "info",
            },
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
        const championships = this.state.championships.filter(
          (championship) => championship.id !== id
        );
        this.setState({
          championships,
          message: { text: "Campeonato apagado com sucesso.", alert: "danger" },
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
              Cadastrar campeonato{" "}
            </h2>
            <FormChampionship championshipCreate={this.save} edit={this.edit} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">
              {" "}
              Lista de campeonatos{" "}
            </h2>
            <ListChampionship
              championships={this.state.championships}
              deleteChampionship={this.delete}
            />
          </div>
        </div>
      </div>
    );
  }
}
