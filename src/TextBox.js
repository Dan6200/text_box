//////////////////////////////////////////////////////////////////////////////////////////////////
////////    In This File I Implement A Text box that handles the User's mouse and  /////////////// 
////////    ...keyboard input and displays the data received on the Screen.    ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


//eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react'            
import handleKeyPress from './KeyFunctions.js'
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
        if (caretOn){
            showCaret(false)
        }
        else 
            showCaret(true)
    }, 500, timerOn)
    
    const Cursor = props => {
        props.setTimer(true) // starts the blinking of caret
        return (<i id='cursor' ref = {cursorRef} style = {props.blinker()}></i>)
    }

    const blinker = isOn => (isOn) ? {display: 'inline-block'} :
        {display: 'none'}

    const printCaret = (array, curIdx) => {
        const displayedText  = [...array]
        displayedText.splice(curIdx+1,0, <Cursor blinker={() => blinker(caretOn)} setTimer={setTimer} key={'caret'+curIdx+1}/>)
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
        paraRef,
        setTimer,
        showCaret
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
