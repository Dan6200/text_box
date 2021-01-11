import React  from 'react'
import {keyGen} from './utilities.js'

const Cursor = props => {
    return (<i id='cursor' ref = {props.myRef} style = {props.blinker()}></i>)
}

const blinker = isOn => (isOn) ? {display: 'inline-block'} :
    {display: 'none'}

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
    return  <span ref={textRef}> {displayedText} </span> 
}

export const printPage = ([line, lIdx, wIdx, textRef, paraRef, cursorRef, caretOn, showCaret]) => {
    return (
        line.map((elem, index) => {
            if (index === lIdx) 
                elem = printCaret(line[lIdx], wIdx, {textRef, cursorRef, caretOn})
            return (
                <p className='normal-text' 
                    id={'line-'+lIdx} 
                    key={keyGen()} // Generates two primes and uses their product as keys
                ref={paraRef}>
                    {elem}
                </p>
            )
        })
    )
}
