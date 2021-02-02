import './App.css';
import React, { Component } from 'react' 

import marked from 'marked'

// Importation d'un fichier js contenant du text qui sera destructuré dans la variable 'sampleText'
import { sampleText } from './sampleText'

class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount () {
    const text = localStorage.getItem('text')
    if(text) {
      this.setState({text})
    }
    else {
      this.setState({text : sampleText})
    }
  }

  componentDidUpdate () {
    const {text} = this.state
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({text})
  }

  renderText = text => {
  
     const __html = marked(text, { sanitize: true })
     return {__html }   
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea className='form-control'
            onChange={this.handleChange}
            rows="35"
            value={this.state.text}>
            </textarea>
          </div>
          <div className="col-sm-6">
            {/* signifie que le ce qui est donné en paramètre n'est pas gérer pas l'admin mais par l'user et peut être dangereux */}
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
