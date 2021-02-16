//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, {useRef, useEffect, useReducer } from 'react'
import modifier from './Reducer.js'
import {Lines} from './Page.js'
import {useInterval} from './utilities.js'
import uuid from 'react-uuid'

let i=0

function TextBox()
{
    const AppState = {
        /// Manages the state of the lines on the screen
        line: [[]],
        /// Line Index...
        lIdx: 0,
        /// Word Index...
        wIdx: 0,

        Keys: [uuid()],

        caretOn: false, timerOn: true, wordWrap: true,
    }

    const [state, dispatch] = useReducer(modifier, AppState)

    const {line, lIdx, wIdx, caretOn, timerOn, wordWrap} = state;

    //const textRef = useRef(Array.from({length: line.length}, el => React.createRef()))
	const textRef = useRef([])

	textRef.current[0] = useRef(null)
	textRef.current[1] = useRef(null)
	textRef.current[2] = useRef(null)
	textRef.current[i] = useRef(null) // <-- Doesn't work TODO fix this
	textRef.current[line.length-1] = useRef(null) // <-- Doesn't work TODO fix this
	console.log(i, textRef.current[i])
	while(i < line.length-1) i++

    const txtBoxRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    let spanWidth = (textRef.current[lIdx].current) ? 
		textRef.current[lIdx].current.offsetWidth : 100

    const paraWidth = paraRef.current ? paraRef.current.clientWidth : 1000

    useEffect(() => {  // Controls the text Wrapping Effect 
        if (wordWrap && spanWidth >= paraWidth-10) {
            dispatch({type: "text_wrap"})
			alert("dispatched")
        }
    }, [spanWidth, wordWrap, line, lIdx, paraWidth])

    useInterval(() => { // Controls the blinking of the timer
        (caretOn) ? dispatch({type: "hide-caret"}) :
            dispatch({type: "show-caret"})
    }, 500, timerOn)

    useEffect(() => {
        dispatch({type: "set-timer-on"});
    }, [line, lIdx, wIdx])

    const linesParam = [ state, textRef, paraRef, cursorRef, caretOn ]

    return (
        <div id="txtbox" 
            tabIndex="0" 
            ref = {txtBoxRef}
            onKeyDown={(e) => {
                e.preventDefault()
                dispatch({type: e.key})}
            } >
                <Lines linesProp={linesParam} />
        </div>
    )
}

export default TextBox
