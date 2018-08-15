import React, { Component } from 'react';
import './App.css';

import Header from './componentes/header';
import Formulario from './componentes/formulario';
import Eventos from './componentes/eventos';

class App extends Component {

  state = {
    categorias: [],
    eventos: []
  }

  token = 'ELXMED664F7O2NCI6PCA';

  componentDidMount() {
    this.obtenerCategorias();
  }

  obtenerCategorias = async () => {
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;
    await fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({categorias: data.categories})
      })
  }

  obtenerEventos = async (busqueda) => {
    let url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.evento}&categories=${busqueda.categoria}?token=${this.token}`;
    await fetch(url)
      .then(respuesta => {return respuesta.json()})
      .then(eventos => {
        this.setState({
          eventos: eventos.events
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="uk-container">
          <Formulario
            categorias={this.state.categorias}
            obtenerEventos={this.obtenerEventos}
          />
          <Eventos
            eventos={this.state.eventos}
          />
        </div>
      </div>
    );
  }
}

export default App;
