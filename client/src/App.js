import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  state = {
    data: [],
    gameText: "Waiting to start.",
    roomNum: 0,
  }
  startGame = () => {
    this.setState({
      gameText: "Entering...", roomNum: 0
    })

  setTimeout(() => {
    this.roomCheck()}, 3000);
  }

  //Checks a room for an exit. If no exit found, move to the next room. Recursive.
  roomCheck = () => {
    let checker = Math.round(Math.random());
    this.setState({gameText: "Searching room..."})

    if(checker == 1){
      setTimeout(() => {
        this.setState({gameText: "Found the exit! Rooms found: " + this.state.roomNum})}, 
        3000);
      }else{
      setTimeout(() => {
        this.setState({gameText: "Found another room!", roomNum: this.state.roomNum+ + 1});
        },3000);

      setTimeout(() => {
        this.roomCheck();
        },6000);
      }
  }


  render(){
    return(
      <div>
        {this.state.gameText}
        <button onClick={this.startGame}> Start</button>
      </div>
    )
  }
}

export default App;
