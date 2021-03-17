//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


import React, {useRef, useEffect, useReducer } from 'react'
import modifier from './Logic/Reducer.js'
import {Lines} from './UI/Page.js'
import {useInterval} from './Logic/utilities.js'
import uuid from 'react-uuid'


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

	/* -- QuerySelector worked much better than refs use this -- */
	const span_elements = document.querySelectorAll('#txtbox > p > span');

    const txtBoxRef = useRef()
   
    const paraRef = useRef()

    const cursorRef = useRef()

    let spanWidth = (span_elements.length && span_elements[lIdx]) ? 
		span_elements[lIdx].offsetWidth : 100	

    const paraWidth = paraRef.current ? paraRef.current.clientWidth : 1000

    useEffect(() => {  // Controls the text Wrapping Effect 
        if (wordWrap && spanWidth >= paraWidth) {
            dispatch({type: "text_wrap"})
        }
    }, [spanWidth, wordWrap, line, lIdx, paraWidth])

	/*useEffect(() => {
		for(let i=0; i<span_elements.length; i++)
		{
			if (span_elements[i])
			{
				let spanWidth = span_elements[i].offsetWidth
				if (spanWidth < paraWidth) 
					dispatch({type: "reverse_wrap"})
			}
		}
	}, [span_elements, paraWidth])*/

    useInterval(() => { // Controls the blinking of the timer
        (caretOn) ? dispatch({type: "hide-caret"}) :
            dispatch({type: "show-caret"})
    }, 500, timerOn)

    useEffect(() => {
        dispatch({type: "set-timer-on"});
    }, [line, lIdx, wIdx])

	useEffect(() => {
		let keyHandler = e => {
			if (e.code.search(/F\d/) >= 0) return
			e.preventDefault()
			dispatch({type: e.key})
		}
		document.addEventListener('keydown', keyHandler)
		return () =>  document.removeEventListener('keydown', keyHandler)
	})

    const linesParam = [ state, paraRef, cursorRef, caretOn ]

    return (
        <div id="txtbox" 
            tabIndex="0" 
            ref = {txtBoxRef} >
                <Lines linesProp={linesParam} />
        </div>
    )
}


export default TextBox
