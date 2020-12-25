import React, {Component} from 'react';

class TextBox extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
        line: [''],
        index: 0,
        nextline: {}
    } 
    this.string = '';
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
 /* 
  print2Screen(state) {
    output = '';
    while (state.nextline === undefined) 
    {
        while (state.line['0'] !== undefined) {
            output += state.line['0'];
        }
        state = state.nextline;
    }
  }
*/
  handleKeyPress(e) {
    if (e.key === "Backspace") 
        this.setState(state => ({
            line: state.line.substring(0, state.line.length-1)
        }))
    else if (e.keyCode === 32)
        this.setState(state => {
                    this.string += '\x20\x20\u200C';
                    state.index++;
                    let retVal = {line: state.line[state.index] + }
                    return retVal;
                })
    else{
        if (e.key === "Shift" || e.key === "CapsLock") 
            return
        else {
            console.log(this.state);
            this.string+= e.key
            this.setState(
                state =>  {

                    ({line: [this.string]})
                }
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
