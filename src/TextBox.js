import React, { useState } from 'react';            
import {Backspace} from './KeyFunctions.js'

function TextBox()
{
    const [line, setLine] = useState([''])
    const [index, setIndex] = useState(0)
    //const [nextLine, setNextLine] = useState({})

 /* 
  printScreen(state) {
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
    const printLine = array => {
        return (
            array.map((elem,index) => (
                <span key = {index.toString()}>
                    {elem + '\u200C'}
                </span>
            ))
        )
    }

    const handleKeyPress = (e) => {
    try {
        /** Create function files that handle each keyboard operation **/
        if (e.key === "Backspace")
        {   /** Calls the Function that handles backspaces **/
            let {
                newLine,
                newIdx, 
            } = Backspace({
                word: line[index],
                line: [...line],
                index
            })
            setIndex(newIdx)
            setLine(newLine)
        }
        else if (e.keyCode === 32)
        {
            e.preventDefault()
            let updateLine = line
            updateLine.push('\x20')
            let newIndex = updateLine.length
            updateLine[newIndex] = ''
            setIndex(newIndex)
            setLine([...updateLine])
        }
        else
        {
            if (e.key === "Shift" || e.key === "CapsLock") 
                return
            else {
                let updateLine = line
                updateLine[index] += e.key
                setLine([...updateLine])
            }
        }
    }
    catch (e) {
        console.log(line.length-1, index, e)
    }
 }
    return (
        <div id="txtbox" tabIndex="0" onKeyDown={handleKeyPress}>
            <p>{printLine(line)}</p>
        </div>
    )
}

export default TextBox
