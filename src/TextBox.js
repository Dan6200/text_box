import React, {Component} from 'react';

class TextBox extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      line: "",
      nextline: {}
    } 
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleKeyPress(e) {
    if (e.key === "Backspace") 
        this.setState(state => ({
            line: state.line.substring(0, state.line.length-1)
        }))
    else if (e.keyCode === 32)
        this.setState(
                state => ({line: state.line+ '\x20\x20\u200C\x20\x20\u200C'})
            )
    else{
        if (e.key === "Shift" || e.key === "CapsLock") 
            return
        else {
            console.log(this.state.line);
            this.setState(
                state => ({line: state.line+ e.key})
            )
        }
    }
  }
  render() {
    return <div id="txtbox" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <span>{this.state.line}</span>
    </div>
  }
}

export default TextBox;
