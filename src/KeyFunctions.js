//////////////////////////////////////////////////////////////////////
//////////       This file handles all Keyboard operations //////////
/////////////////////////////////////////////////////////////////////

import {
    Backspace, updateLine, spaceBar, handleEnterKey, handleWrap,
} from './utilities.js'

export default function modifier(state, action)
{
    try {
        /// Stops the caret from blinking...
        const caretState = {
            caretOn: true, timerOn: false, wordWrap: true,
        }

        let values = {
                newLine: [], newLIdx: 0, newWIdx: 0
        }

        const set = val => ({...state, ...caretState, line: val.newLine, 
                lIdx: val.newLIdx, wIdx: val.newWIdx})

        switch (action.type)
        {
            case "Backspace":
             // Calls the Function that handles backspaces 
                // Declare new state values...
                values = Backspace({   /// Modify state values...
                    line: state.line, lIdx: state.lIdx, wIdx: state.wIdx
                })
                /// Update state values...
                return set(values)
            case " ":
            // Calls the fucntion that handles input from the spacebar
                /// Modify state values...
                values = spaceBar({line: state.line, lIdx: state.lIdx, wIdx: state.wIdx})
                /// Update state values...
                return set(values)
            case "ArrowLeft":
                if (state.wIdx >= 0)
                    return { ...state, ...caretState, wIdx: state.wIdx - 1}
                break;
            case "ArrowRight":
                if (state.wIdx < state.line[state.lIdx].length)
                    return { ...state, ...caretState, wIdx: state.wIdx + 1}
                break;
             case "ArrowUp":
                if (state.lIdx >= 0)
                    return { ...state, ...caretState, lIdx: state.lIdx - 1}
                break;
            case "ArrowDown":
                if (state.lIdx < state.line.length)
                    return { ...state, ...caretState, lIdx: state.lIdx + 1}
                break;
            case "Enter":
                values = handleEnterKey({line: state.line, lIdx: state.lIdx, wIdx: state.wIdx})
                return set(values)
            case "text_wrap":
                values = handleWrap ({line: state.line, lIdx: state.lIdx, wIdx: state.wIdx,
                wordWrap: state.wordWrap})
                return {...state, ...values}
            case "hide-caret":
                return {...state, caretOn: state.caretOn=false};
            case "show-caret":
                return {...state, caretOn: state.caretOn=true};
            case "set-timer-on":
                return {...state, timerOn: state.timerOn=true};
            default:
            /// Modify state values...
                values = updateLine(action.type, state.line, state.lIdx, state.wIdx)
                /// Update state values...
                return set(values)
            }
            
    }
        catch (e) {
        console.info(e)
        console.log(state)
    }
}
