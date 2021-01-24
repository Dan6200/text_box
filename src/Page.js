import React from 'react'
import uuid from 'react-uuid'

const areEq = (preProps, postProps) => preProps === postProps

const Cursor = React.memo(props => {
    return (<span id='cursor' ref = {props.myRef} className = {props.blinker()}></span>)
}, areEq)

const blinker = isOn => (isOn) ? 'cursor' : 'hide'

const printCaret = (array, curIdx, {textRef, cursorRef, caretOn}) => {
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
    displayedText.push(array.slice(curIdx).join(''))

    return displayedText 
}

let numOfKeys = 0;
const Key = {vals: [], set () { this.vals.push(uuid()) }};
const genKey = howMany => {
    if (howMany > numOfKeys)
        while(numOfKeys++ < howMany)
            Key.set()
    return Key.vals
}

export const Lines = props => {
    const [line, lIdx, wIdx, textRef, paraRef, cursorRef, caretOn] = props.linesProp
    let keys = [...genKey(line.length)]

    return (
        line.map((elem, index) => {
            if (index === lIdx) 
                elem = printCaret(line[lIdx], wIdx, {textRef, cursorRef, caretOn})
            else elem = elem.join('')

            return (
                <p className='normal-text' 
                    id={'line-'+ index} 
                    key={keys[index]}
                    ref={paraRef}>
                    <span ref={textRef}>
                        {elem}
                    </span>
                </p>
            )
        })
    )
}
