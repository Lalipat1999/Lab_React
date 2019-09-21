import React from 'react';
import './App.css';
import _ from 'lodash';
import CharacterCard from './CharacterCard';

 
let message = 'JIMIN'
 
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    attempt: 1,
    guess: [],
    completed: false,
    restart: 1
  }
}
 
class App extends React.Component {

  state = prepareStateFromWord(message);
  restart =()=>{
    this.setState({
      restart: this.state.restart + 1,
      completed: !this.state.completed
    })
  }
  activationHandler = (c) => {
    let guess = [...this.state.guess, c]
    this.setState({ guess })
    if (guess.length == this.state.chars.length) {
      if (guess.join('').toString() == this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], attempt: this.state.attempt + 1 })
      }
    }
  }
 
  render() {
    return (
      <div>
        {
          
          Array.from(this.state.chars).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              attempt={this.state.attempt}
              activationHandler={this.activationHandler}
              restart = {this.state.restart}
            />
          ))
          
          
        }
        <h5>BY LALIPAT SUKKWAN 6035512051</h5>
        
        <h2>Let's Play!!</h2>
    
        {
          Array.from(this.state.guess).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }
        <div>ROUND {this.state.attempt}</div>
        {
          this.state.completed && <h4>YOU WIN!!</h4>
        }
        {
          this.state.completed &&<button onClick={this.restart}>Try Again!</button>
        }
        
      </div>
     
    )
  }
}
 
export default App