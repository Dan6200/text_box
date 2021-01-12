import React, {useEffect}  from 'react'
import {keyGen} from './utilities.js'

const Cursor = props => {
    return (<span id='cursor' ref = {props.myRef} className = {props.blinker()}></span>)
}

const blinker = isOn => (isOn) ? 'cursor' : 'hide'

const printCaret = (array, curIdx, {textRef, cursorRef, caretOn, setTimer}) => {
    let displayedText  = []

    displayedText = array.slice(0, curIdx) 
    displayedText = [displayedText.join('')]
    displayedText.push(
        <Cursor 
            myRef={cursorRef}
            blinker={() => blinker(caretOn)} 
            key={'caret'+curIdx+1}
        />
    )
    displayedText.push(array.slice(curIdx))

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
                    key={keyGen()[index]} // Generates the product of two primes to be used as keys
                ref={paraRef}>
                    <span ref={textRef}>
                        {elem}
                    </span>
                </p>
            )
        })
    )
}
