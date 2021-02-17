//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, {useRef, useEffect, useReducer } from 'react'
import modifier from './Reducer.js'
import {Lines} from './Page.js'
import {useInterval} from './utilities.js'
import uuid from 'react-uuid'
import {Node, FastLists} from './fast_lists.js'


function TextBox()
{
    const AppState = {
        /// Manages the state of the lines on the screen
        line: [[]],
        line2: new FastLists(new Node('A')),
        /// Line Index...
        lIdx: 0,
        /// Word Index...
        wIdx: 0,

        Keys: [uuid()],

        caretOn: false, timerOn: true, wordWrap: true,
    }

    const [state, dispatch] = useReducer(modifier, AppState)

    const {line, lIdx, wIdx, caretOn, timerOn, wordWrap} = state;

	console.log(state.line2.getHead())
	state.line2.add(new Node('B'))
	state.line2.forward()
	console.log(state.line2.getHead())

	/* -- QuerySelector worked much better than refs use this -- */
	const span_elements = document.querySelectorAll('p > span');

    const txtBoxRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    let spanWidth = (span_elements.length && span_elements[lIdx]) ? 
		span_elements[lIdx].offsetWidth : 100	

    const paraWidth = paraRef.current ? paraRef.current.clientWidth : 1000

    useEffect(() => {  // Controls the text Wrapping Effect 
        if (wordWrap && spanWidth >= paraWidth-10) {
            dispatch({type: "text_wrap"})
        }
    }, [spanWidth, wordWrap, line, lIdx, paraWidth])

    useInterval(() => { // Controls the blinking of the timer
        (caretOn) ? dispatch({type: "hide-caret"}) :
            dispatch({type: "show-caret"})
    }, 500, timerOn)

    useEffect(() => {
        dispatch({type: "set-timer-on"});
    }, [line, lIdx, wIdx])

    const linesParam = [ state, paraRef, cursorRef, caretOn ]

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
