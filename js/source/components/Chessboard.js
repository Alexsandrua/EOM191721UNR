import React from  'react';

class Chessbord extends React.Component{
  constructor() {
    super();
    this.state = {color: "red"};
  }
  
  chessbord_() {
    let chessBord = $(`<table></table>`);
    for (let i = 0; i < 12; i++) {
      let row = $(`<tr></tr>`);
        for (let j = 0; j < 80; j++) {
          let cell = $(`<td class="cell"></td>`);
          if ((i + j) % 2 == 0) {
            cell.addClass('whitecell');
          } else {
            addClass(`blackcell`);
          }
          row.append(cell);
        }
        chessBoard.append(row);
    }
    $(`#chessboard`).append(chessBoard);
  }
  render() {
    return ('<h2> I am a {this.props.color} Flite!<h2>')
  }
} 
