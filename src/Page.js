import React  from 'react'
import {keyGen} from './utilities.js'

const Cursor = props => {
    return (<span id='cursor' ref = {props.myRef} className = {props.blinker()}></span>)
}

const blinker = isOn => (isOn) ? 'cursor' : 'hide'

const printCaret = (array, curIdx, {textRef, cursorRef, caretOn, setTimer}) => {
    const displayedText  = [...array]
    displayedText.splice(
        curIdx + 1, 
        0, 
        <Cursor 
            myRef={cursorRef}
            blinker={() => blinker(caretOn)} 
            key={'caret'+curIdx+1}
        />
    )
    return displayedText 
}

export const Lines = props => {
    const [line, lIdx, wIdx, textRef, paraRef, cursorRef, caretOn] = props.linesProp
    return (
        line.map((elem, index) => {
            if (index === lIdx) 
                elem = printCaret(line[lIdx], wIdx, {textRef, cursorRef, caretOn})
            return (
                <p className='normal-text' 
                    id={'line-'+ index} 
                    key={keyGen()} // Generates two primes and uses their product as keys
                ref={paraRef}>
                    <span ref={textRef}>
                        {elem}
                    </span>
                </p>
            )
        })
    )
}
