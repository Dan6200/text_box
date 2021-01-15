import React from 'react'
import uuid from 'react-uuid'

const areEq = (preProps, postProps) => preProps === postProps

const Cursor = React.memo(props => {
    return (<span id='cursor' ref = {props.myRef} className = {props.blinker()}></span>)
}, areEq)

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

export const Lines = React.memo(props => {
    const [line, lIdx, wIdx, textRef, paraRef, cursorRef, caretOn] = props.linesProp

    return (
        line.map((elem, index) => {
            if (index === lIdx) 
                elem = printCaret(line[lIdx], wIdx, {textRef, cursorRef, caretOn})
            return (
                <p className='normal-text' 
                    id={'line-'+ index} 
                    key={uuid()} 
                ref={paraRef}>
                    <span ref={textRef}>
                        {elem}
                    </span>
                </p>
            )
        })
    )
}, areEq)
