import React, { useState } from 'react';            
//import Backspace form 'KeyFunctions/Backspace.js'

function TextBox()
{
    const [line, setLine] = useState([''])
    const [index, setIndex] = useState(0)
    const [nextLine, setNextLine] = useState({})

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
                    {elem}
                </span>
            ))
        )
    }

    const handleKeyPress = (e) => {
    try {
        let updateLine = line
        /** Create function files that handle each keyboard operation **/
        if (e.key === "Backspace")
        { 
            let word = updateLine[index]
            if (word && word.length > 1) 
                word = word.substring(0, word.length-1)
            else 
                word = ''
            if (updateLine.length >= 1 && updateLine[index].length === 1) {
                updateLine.pop()
                if (index > 0) setIndex(index - 1);
                word = updateLine[index-1]
            }
            else {
                updateLine[index] = word;
            }
            setLine([...updateLine])
        }
        else if (e.keyCode === 32)
        {
            e.preventDefault()
            updateLine = line
            updateLine.push('\x20\u200C')
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
                updateLine = line
                updateLine[index] += e.key
                console.log(updateLine)
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

export default TextBox;
