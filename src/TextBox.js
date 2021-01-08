//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


//eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react'            
import handleKeyPress from './KeyFunctions.js'

function TextBox()
{
    /// Manages the state of the lines on the screen
    const [line, setLine] = useState([[]])
    /// Line Index...
    const [lIdx, setLIdx] = useState(0)
    /// Word Index...
    const [wIdx, setWIdx] = useState(0)
   
    const textRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    const Cursor = () => {
        return (<i id='cursor' ref = {cursorRef}></i>)
    }

    const printCaret = (array, curIdx) => {
        const displayedText  = [...array]
        displayedText.splice(curIdx+1,0, <Cursor key={'caret'+curIdx+1}/>)
        return  <span ref={textRef}> {displayedText} </span> 
    }
   
    const printPage = (line, lIdx, wIdx) => {
        return (
            line.map((elem, index) => {
                if (index === lIdx) 
                   elem = printCaret(line[lIdx], wIdx)
                return (
                    <p className='Text' 
                        id='normal-text' 
                        key={elem[wIdx]+lIdx}
                    ref={paraRef}>
                        {elem}
                    </p>
                )
            })
        )
    }

    const KeyPressParam = {
                line, 
                setLine, 
                lIdx,
                setLIdx,
                wIdx,
                setWIdx,
                textRef,
                paraRef
    }

    return (
        <div id="txtbox" 
            tabIndex="0" 
            onKeyDown={(e) => handleKeyPress(
                e,
                KeyPressParam 
            )}>
                {printPage(line, lIdx, wIdx)}
        </div>
    )
}

export default TextBox
