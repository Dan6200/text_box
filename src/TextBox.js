//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useRef, useEffect } from 'react'
import handleKeyPress from './KeyFunctions.js'
import {Lines} from './Page.js'
import {useInterval, cpyMatrix} from './utilities.js'


let counter = 0
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
    
    const [wordWrap, setWrap] = useState(true)

    const textRef = useRef()

    const txtBoxRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    const spanWidth = (textRef.current) ? textRef.current.offsetWidth : 100

    const paraWidth = paraRef.current ? paraRef.current.clientWidth : 1000

    useEffect(() => {  // Controls the text Wrapping Effect 
        if (wordWrap && spanWidth >= paraWidth-10) {
            const newLine = cpyMatrix(line)
            let lastWord = []
            let array = newLine[lIdx] 
            let i= array.length-1
            while (array[i] !== '\x20\u200c' && i >= 0) i--
            if (i > 0) 
                lastWord = array.splice(i, array.length - i + 1)
            newLine.splice(lIdx+1, 0, lastWord)
            setLine(newLine)
            setLIdx(l => l + 1)
            setWIdx(lastWord.length)
            console.log("I'm supposed to run once")
        }
    }, [spanWidth, wordWrap, line, lIdx, paraWidth])

    useInterval(() => { // Controls the blinking of the timer
        (caretOn) ? showCaret(false) :
            showCaret(true)
    }, 500, !timerOn)

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
        showCaret, 
        setWrap
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
                {console.log("I run this many times " + counter++)}
        </div>
    )
}

    

export default TextBox
