import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    gameText: "Waiting to start.",
    roomNum: 0
  };
  startGame = () => {
    this.setColor();
    this.setState({
      gameText: "Entering...",
      roomNum: 0
    });

    setTimeout(() => {
      this.roomCheck();
    }, 3000);
  };

  //Checks a room for an exit. If no exit found, move to the next room. Recursive.
  roomCheck = () => {
    let checker = Math.round(Math.random());
    this.setState({ gameText: "Searching room..." });

    if (checker == 1) {
      setTimeout(() => {
        this.setState({
          gameText: "Found the exit! Rooms found: " + this.state.roomNum
        });
      }, 3000);
    } else {
      this.newRoom();
    }
  };

  newRoom = () => {
    setTimeout(() => {
      this.setState({
        gameText: "Found another room!",
        roomNum: this.state.roomNum + 1
      });
    }, 3000);

    setTimeout(() => {
      this.roomCheck();
    }, 6000);
  };

  grid = () => {
    let grid = [];
    for (let i = 0; i < 9; i++) {
      grid.push(
        <div className="row" id={"row" + i}>
          {this.square()}
        </div>
      );
    }
    return grid;
  };

  square = () => {
    let square = [];
    for (let i = 0; i < 17; i++) {
      square.push(<div className="square" id={"square" + i} />);
    }
    return square;
  };

  setColor = () => {
    let elements = document.querySelectorAll('row1');
    
    for(let elem of elements){
      document.getElementById('square1').
    }
  };
  render() {
    return (
      <div className="game">
        {this.state.gameText}
        <button onClick={this.startGame}> Start</button>
        <div className="gridContainer">{this.grid()}</div>
      </div>
    );
  }
}

export default App;
