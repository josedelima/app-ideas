import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import React from "react";
import ReactDOM from "react-dom";
import { TextInput, Button } from "react-materialize";

import "./index.css";

const converterBin2Dec = (valor, indice) => {
  if (valor.length > 1) {
    const valorInteiro = parseInt(valor[valor.length-1]);
    console.log(valorInteiro);
    return (Math.pow(2, indice) * parseInt(valor[valor.length-1])) + converterBin2Dec(valor.substring(0, valor.length-1), ++indice);
  } else {
    return parseInt(valor[valor.length-1]) * Math.pow(2, indice);
  }
}

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numeroBinario: "",
      numeroDecimal: "",
      invalidProp: "",
      mensagemErro: ""
    };

    this.validaCampo = this.validaCampo.bind(this);
  }

  validaCampo(value) {
    const valor = String(value);
    this.setState({
      numeroBinario: "",
      invalidProp:"",
      mensagemErro: ""
    })
    if (valor.length > 0) {
      for (let i = 0; i < valor.length; i++) {
        if (valor[i] !== "0" && valor[i] !== "1") {
          this.setState({
            invalidProp:"invalid",
            mensagemErro: "Campos só devem conter 0 (zeros) e 1 (uns)"
          });
          return;
        }
      }
    }

    if (valor.length > 8) {
      this.setState({
        mensagemErro: "Quantidade de caracteres tem que ser inferior a 8"
      });
      return;
    }

    this.setState({numeroBinario: valor})
  }

  converterValor() {
    if(this.state.numeroBinario) {
      let valorConvertido = converterBin2Dec(this.state.numeroBinario, 0);
      this.setState({numeroDecimal: valorConvertido});
      console.log(valorConvertido);
    }
  }
  render() {
    return (
      <div>
        <TextInput 
          inputClassName={this.state.invalidProp}
          id="input-binary" 
          label="Inserir número binário" 
          data-length="8" 
          error={this.state.mensagemErro}
          onChange={(e) => {console.log(e.target); this.validaCampo(e.target.value)}}
          />

        <Button
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
          onClick={() => {this.converterValor()}}
        >
          Converter
        </Button>
        <h3>{this.state.numeroDecimal}</h3>
      </div>
    );
  }
}

ReactDOM.render(<Principal />, document.getElementById("root"));
