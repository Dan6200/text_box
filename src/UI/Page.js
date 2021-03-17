import React from 'react'

const areEq = (preProps, postProps) => preProps === postProps

const Cursor = React.memo(props => {
    return (<span id='cursor' ref = {props.myRef} className = {props.blinker()}></span>)
}, areEq)

const blinker = isOn => (isOn) ? 'cursor' : 'hide'

const printCaret = (array, curIdx, {cursorRef, caretOn}) => {
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


export const Lines = React.memo(props => {
    const [state, paraRef, cursorRef, caretOn] = props.linesProp
    return (
        state.line.map((elem, index) => {
            if (index === state.lIdx) 
                elem = printCaret(state.line[state.lIdx], state.wIdx, {cursorRef, caretOn})
            else elem = elem.join('')
            return (
                <p className='normal-text' 
                    id={'line-'+ index} 
                    key={state.Keys[index]}
                    ref={paraRef}>
                    <span id={"span"+index}>
                        {elem}
                    </span>
                </p>
            )
        })
    )
}, areEq)
