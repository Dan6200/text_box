//////////////////////////////////////////////////////////////////////
//////////       This file handles all Keyboard operations //////////
/////////////////////////////////////////////////////////////////////

import {
    Backspace, 
    updateState, 
    updateLine, 
    spaceBar, 
    handleEnterKey, 
} from './utilities.js'

export default function reducer(state, action)
{
    try {
        /// Stops the caret from blinking...
        const caretState = {
            showCaret: true 
            setTimer: false
            // Enable text wrap
            setWrap: true
        }

        let values = {
                newLine: [],
                newLIdx: 0,
                newWIdx: 0
        }

        const set = val => ({...state, ...caretState, line: val.newLine, 
                lIdx: val.lIdx, wIdx: val.wIdx})

        switch (action.type)
            case "Backspace":
             // Calls the Function that handles backspaces 
                // Declare new state values...
                values = Backspace({   /// Modify state values...
                    line: state.line,
                    lIdx: state.lIdx,
                    wIdx: state.wIdx
                })
                /// Update state values...
                return set(values)
            case " ":
            // Calls the fucntion that handles input from the spacebar
                /// Modify state values...
                values = spaceBar(e, {line: state.line, state.lIdx, state.wIdx})
                /// Update state values...
                return set(values)
            case "ArrowLeft":
                if (wIdx >= 0)
                    return { ...state, ...caretState, wIdx: state.wIdx - 1}
                break
            case "ArrowRight":
                if (wIdx < line[lIdx].length)
                    return { ...state, ...caretState, wIdx: state.wIdx + 1}
             case "ArrowUp":
                if (lIdx >= 0)
                    setLIdx(lIdx - 1)
                    return { ...state, ...caretState, lIdx: state.lIdx - 1}
            case "ArrowDown":
                if (lIdx < line.length)
                    setLIdx(lIdx + 1)
                    return { ...state, ...caretState, lIdx: state.lIdx + 1}
                break
            case "Enter":
                values = handleEnterKey({line: state.line, state.lIdx, state.wIdx})
                return set(values)
            case "text_wrap":
                const newLine = line
                let lastWord = []
                let array = newLine[lIdx] 
                let i= array.length-1
                while (array[i] !== '\x20\u200c' && i >= 0) i--
                if (i > 0) 
                    lastWord = array.splice(i, array.length - i + 1)
                newLine.splice(lIdx+1, 0, lastWord)
                setLine(newLine)
                setLIdx(l => l + 1)
                setWIdx(lastWord.length)
                setWrap(false) // Block it from async-ly re-running while the initial consition is still true
                return {...state,
            default:
            /// Modify state values...
                values = updateLine(e, {line: state.line, state.lIdx, state.wIdx})
                /// Update state values...
                return set(values)
            }
            
    }
        catch (e) {
        console.info(e)
        console.log(state)
    }
}
