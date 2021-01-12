//////////////////////////////////////////////////////////////////////
//////////       This file handles all Keyboard operations //////////
/////////////////////////////////////////////////////////////////////

import {
    cpyMatrix, 
    Backspace, 
    updateState, 
    updateLine, 
    spaceBar, 
    handleEnterKey, 
    primeGen
} from './utilities.js'

export default function handleKeyPress 
    (e, line, setLine, lIdx, setLIdx, wIdx, setWIdx, setTimer, showCaret, setWrap)  
{
    try {
        /// Stops the caret from blinking...
        showCaret(true)
        setTimer(false)

        let values = {
                newLine: [],
                newLIdx: 0,
                newWIdx: 0
        }

        let setters = {
            setLine,
            setLIdx,
            setWIdx
        }

        switch (e.key) {
            case "Backspace":
             // Calls the Function that handles backspaces 
                // Declare new state values...
                values = Backspace({   /// Modify state values...
                    line: cpyMatrix(line),
                    lIdx,
                    wIdx
                })
                /// Update state values...
                updateState(values, setters)
                break
            case " ":
            // Calls the fucntion that handles input from the spacebar
                /// Modify state values...
                values = spaceBar(e, {line: cpyMatrix(line), lIdx, wIdx})
                /// Update state values...
                updateState(values, setters)
                break
            case "ArrowLeft":
                if (wIdx >= 0)
                    setWIdx(wIdx - 1)
                break
            case "ArrowRight":
                if (wIdx < line[lIdx].length)
                    setWIdx(wIdx + 1)
                break
            case "Enter":
                values = handleEnterKey({line: cpyMatrix(line), lIdx, wIdx})
                updateState(values, setters)
                primeGen()      // Generate new keys
                break
            default:
            /// Modify state values...
                values = updateLine(e, cpyMatrix(line), lIdx, wIdx)
                /// Update state values...
                updateState(values, setters)
            }
    }
    catch (e) {
        console.info(e)
        console.log(line, lIdx, wIdx)
    }
}
