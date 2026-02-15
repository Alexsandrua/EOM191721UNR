import React from 'react';

const Button = ({ children, style, onClick }) => {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

class Button_ extends React.Component {
  constructor(props) {
    super(props);
    this.titleDef = "Button";
  }
  changeDo = () => {
    console.log("----TEST----");
  }
  titleSet(titles) {
    console.log("----TEST1----");
    this.titleDef = titles;
  }
  render() {
    return (
      <button
        type="button"
        onClick={this.changeDo}>
        {this.titleDef}
      </button>
    )
  }
}
