//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useRef, useEffect } from 'react'            
import handleKeyPress from './KeyFunctions.js'
import {Lines} from './Page.js'
import {useInterval} from './utilities.js'

function TextBox()
{
    /// Manages the state of the lines on the screen
    const [line, setLine] = useState([[]])
    /// Line Index...
    const [lIdx, setLIdx] = useState(0)
    /// Word Index...
    const [wIdx, setWIdx] = useState(0)

    const [caretOn, showCaret] = useState(false)

    const [timerOn, setTimer] = useState(true)

    const textRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    useInterval(() => {
        (caretOn) ? showCaret(false) :
            showCaret(true)
    }, 500, false)

    useEffect(() => {
        setTimer(true)
    }, [line, lIdx, wIdx])

    const KeyPressParam = [
        line, 
        setLine, 
        lIdx,
        setLIdx,
        wIdx,
        setWIdx,
        setTimer,
        showCaret
    ]

    const linesParam = [
        line,
        lIdx,
        wIdx,
        textRef,
        paraRef,
        cursorRef,
        caretOn,
    ]

    return (
        <div id="txtbox" 
            tabIndex="0" 
            onKeyDown={(e) => handleKeyPress(
                e,
                ...KeyPressParam 
            )}>
                <Lines linesProp={linesParam} />
        </div>
    )
}

    

export default TextBox
