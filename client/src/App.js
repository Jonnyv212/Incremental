import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    gameText: "Waiting to start.",
    gameText2: "Number of items found: ",
    roomNum: 0,
    row: 4,
    square: 8,
    itemNum: 0
  };
  startGame = () => {
    document.getElementById("startButton").disabled = true;
    this.resetColor();
    this.setState({
      gameText: "Entering...",
      gameText2: "",
      roomNum: 0,
      row: 4,
      square: 8,
      itemNum: 0
    });
    this.setColor(this.state.row, this.state.square, "green");
    setTimeout(() => {
      this.roomCheck();
    }, 3000);
  };

  //Checks a room for an exit. If no exit found, move to the next room. Recursive.
  roomCheck = () => {
    let checker = Math.round(Math.random() * 10);

    this.setState({ gameText: "Searching room..." });

    this.lootCheck();

    if (checker == 5) {
      document.getElementById("startButton").disabled = false;
      setTimeout(() => {
        this.setState({
          gameText: "Found the exit! Rooms found: " + this.state.roomNum,
          gameText2: "Number of items found: " + this.state.itemNum,
          roomNum: 0,
          row: 4,
          square: 8,
          itemNum: 0
        });
      }, 3000);
    } else {
      this.newRoom();
    }
  };

  newRoom = () => {
    setTimeout(() => {
      this.setState(
        {
          gameText: "Found another room!",
          roomNum: this.state.roomNum + 1
        },
        this.selectDirection()
      );
    }, 3000);

    setTimeout(() => {
      this.roomCheck();
    }, 5000);
  };

  lootCheck = () => {
    let lootChance = Math.floor(Math.random() * 100);

    if (lootChance >= 90) {
      this.setState({
        // gameText2: "Found loot! Chance: " + lootChance + "%",
        itemNum: this.state.itemNum + 1
      });
    }
  };
  selectDirection = () => {
    let west = -1;
    let east = 1;
    let north = -1;
    let south = 1;

    let randDirection = Math.floor(Math.random() * 4);
    // let randDirection = 0;

    if (randDirection == 3) {
      if (this.state.square - 1 < 0) {
        console.log("Out of bounds. West");
        this.selectDirection();
      } else {
        this.setState({
          square: this.state.square + west
        });
        this.setColor(this.state.row, this.state.square + 1, "blue");
        this.setColor(this.state.row, this.state.square, "green");
        console.log("Moved west");
      }
    } else if (randDirection == 2) {
      if (this.state.square + 1 > 16) {
        console.log("Out of bounds. East");
        this.selectDirection();
      } else {
        this.setState({
          square: this.state.square + east
        });
        this.setColor(this.state.row, this.state.square - 1, "blue");
        this.setColor(this.state.row, this.state.square, "green");
        console.log("Moved east");
      }
    } else if (randDirection == 1) {
      if (this.state.row - 1 < 0) {
        console.log("Out of bounds. North");
        this.selectDirection();
      } else {
        this.setState({
          row: this.state.row + north
        });
        this.setColor(this.state.row + 1, this.state.square, "blue");
        this.setColor(this.state.row, this.state.square, "green");
        console.log("Moved north");
      }
    } else if (randDirection == 0) {
      if (this.state.row + 1 >= 9) {
        console.log("Out of bounds. South");
        this.selectDirection();
      } else {
        this.setState({
          row: this.state.row + south
        });
        this.setColor(this.state.row - 1, this.state.square, "blue");
        this.setColor(this.state.row, this.state.square, "green");
        console.log("Moved south");
      }
    }
  };

  row = () => {
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(
        <div className="row" id={"row" + i}>
          {this.square()}
        </div>
      );
    }
    return row;
  };

  square = () => {
    let square = [];
    for (let i = 0; i < 17; i++) {
      square.push(<div className="square" id={"square" + i} />);
    }
    return square;
  };

  setColor = (row, square, color) => {
    //Gets children of row (selected by array this.grid()[0])
    var c = document.getElementById(this.row()[row].props.id).childNodes;

    //Sets background color of child of selected row (select by array c[0])
    c[square].style.backgroundColor = color;

    // console.log("Row index: " + randRow + " Square index: " + randSquare)
  };

  resetColor = () => {
    for (let i = 0; i < 9; i++) {
      var c = document.getElementById(this.row()[i].props.id).childNodes;

      for (let j = 0; j < 17; j++) {
        c[j].style.backgroundColor = "white";
      }
    }
  };
  render() {
    return (
      <div className="game">
        <div className="content">
          <div className="topContent">
            <div className="gameText">{this.state.gameText}</div>
            <button id="startButton" onClick={this.startGame}>
              {" "}
              Start
            </button>
          </div>
          <div className="gridContainer">{this.row()}</div>
          {this.state.gameText2}
        </div>
      </div>
    );
  }
}

export default App;
