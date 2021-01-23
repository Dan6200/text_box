//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useRef, useEffect, useReducer } from 'react'
import reducer from './KeyFunctions.js'
import {Lines} from './Page.js'
import {useInterval} from './utilities.js'


function TextBox()
{
    const AppState = {
        /// Manages the state of the lines on the screen
        line: [[]],
        /// Line Index...
        lIdx: 0,
        /// Word Index...
        wIdx: 0,
        caretOn: false,
        timerOn: true,
        wordWrap: true,
    }

    const [state, dispatch] = useReducer(reducer, AppState)

    const {line, lIdx, wIdx, caretOn, timerOn, wordWrap} = state;

    const textRef = useRef()

    const txtBoxRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    const spanWidth = (textRef.current) ? textRef.current.offsetWidth : 100

    const paraWidth = paraRef.current ? paraRef.current.clientWidth : 1000

    useEffect(() => {  // Controls the text Wrapping Effect 
        if (wordWrap && spanWidth >= paraWidth-10) {
            dispatch({type: "text_wrap"})
        }
    }, [spanWidth, wordWrap, line, lIdx, paraWidth])

    useInterval(() => { // Controls the blinking of the timer
        (caretOn) ? showCaret(false) :
            showCaret(true)
    }, 500, timerOn)

    useEffect(() => {
        setTimer(true)
    }, [line, lIdx, wIdx])
   
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
            onKeyDown={(e) => dispatch({type: e.key})} >
                <Lines linesProp={linesParam} />
        </div>
    )
}

    

export default TextBox
