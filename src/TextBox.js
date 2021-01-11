//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useRef, useEffect } from 'react'            
import ReactDOM from 'react-dom'
import handleKeyPress from './KeyFunctions.js'
import {Lines} from './Page.js'
import {useInterval, cpyMatrix} from './utilities.js'

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

    const txtBoxRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    const spanWidth = (textRef.current) ? textRef.current.offsetWidth : 100

    const paraWidth = paraRef.current ? paraRef.current.clientWidth : 1000

    const boxPadding = parseInt(txtBoxRef.current ? 
        window.getComputedStyle(txtBoxRef.current).getPropertyValue("padding") : '0px')

    console.log(spanWidth, paraWidth, boxPadding, paraRef)

    useEffect(() => {   // Hooks is called twice fix this!
        if (spanWidth >= paraWidth - boxPadding) {
            const newLine = cpyMatrix(line)
            newLine.splice(lIdx+1, 0, [])
            setLine(newLine)
            setLIdx(lIdx+1)
            setWIdx(0)
        }
    }, [line, lIdx, wIdx])

    useInterval(() => {
        (caretOn) ? showCaret(false) :
            showCaret(true)
    }, 500, timerOn)

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
            ref = {txtBoxRef}
            onKeyDown={(e) => handleKeyPress(
                e,
                ...KeyPressParam 
            )}>
                <Lines linesProp={linesParam} />
        </div>
    )
}

    

export default TextBox
