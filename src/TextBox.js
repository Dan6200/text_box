import React, { useState } from 'react';            

let word = ''

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
        let updateLine = line
        if (e.key === "Backspace")
        { 
            console.log(word)
            if (word && word.length > 1) 
                word = word.substring(0, word.length-1)
            else 
                word = ''
            updateLine = line
            if (line[index] === '') {
                updateLine.pop()
                if (index > 0) setIndex(index - 1);
                word = updateLine[index]
                console.log(word)
            }
            else {
                updateLine[index] = word;
            }
            setLine([...updateLine])
        }
        else if (e.keyCode === 32)
        {
            e.preventDefault()
            word = '\x20\x20\u200C'
            console.log(index)
            updateLine = line
            updateLine.push(word)
            setLine([...updateLine])
            setIndex(index + 2)
            console.log(index)
            word = ''
        }
        else
        {
            if (e.key === "Shift" || e.key === "CapsLock") 
                return
            else {
                word+= e.key
                updateLine = line
                updateLine[index] = word
                setLine([...updateLine])
            }
        }
    }
    console.log(line)
    return (
        <div id="txtbox" tabIndex="0" onKeyDown={handleKeyPress}>
            <p>{printLine(line)}</p>
        </div>
    )
}

export default TextBox;
