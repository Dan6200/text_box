import React  from 'react'


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
