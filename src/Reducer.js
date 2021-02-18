//////////////////////////////////////////////////////////////////////
//////////      This file handles all State Modifications    ////////
/////////////////////////////////////////////////////////////////////

import {
    Backspace, updateLine, spaceBar, handleEnterKey, handleWrap, genKeys
} from './utilities.js'

export default function modifier(state, action)
{
    try {
        /// Stops the caret from blinking...
        const stateMods = {
            caretOn: true, timerOn: false, wordWrap: true,
        }

		console.log(state.lIdx, state.wIdx)
        switch (action.type)
        {
            case "Backspace":
             // Calls the Function that handles backspaces 
                /// Update state values...
                return {...state, ...stateMods, ...Backspace({  
                    line: state.line, lIdx: state.lIdx, wIdx: state.wIdx
                })}
            case " ":
            // Calls the fucntion that handles input from the spacebar
                /// Update state values...
                return {...state, ...stateMods, ...spaceBar({
                    line: state.line, lIdx: state.lIdx, wIdx: state.wIdx
                })}
            case "ArrowLeft":
                if (state.wIdx)
                    return { ...state, ...stateMods, wIdx: state.wIdx - 1}
				else if (state.lIdx)
					return { ...state, ...stateMods, lIdx: state.lIdx - 1, 
						wIdx: state.line[state.lIdx-1].length}
				return state
            case "ArrowRight":
                if (state.wIdx < state.line[state.lIdx].length)
                    return { ...state, ...stateMods, wIdx: state.wIdx + 1}
				else if (state.lIdx < state.line.length-1)
					return {...state, ...stateMods, lIdx: state.lIdx + 1, wIdx: 0}
				return state
             case "ArrowUp":
                if (state.lIdx)
                    return { ...state, ...stateMods, lIdx: state.lIdx - 1, 
						wIdx: (state.wIdx > state.line[state.lIdx-1].length) ?
							state.line[state.lIdx-1].length : state.wIdx}
				return state
            case "ArrowDown":
                if (state.lIdx < state.line.length-1)
                    return { ...state, ...stateMods, lIdx: state.lIdx + 1,
						wIdx: (state.wIdx > state.line[state.lIdx+1].length) ?
							state.line[state.lIdx+1].length : state.wIdx}
				return state
            case "Enter":
                return {...state, ...stateMods, Keys: genKeys([...state.Keys], 
                    state.line.length + 1, state.Keys.length), ...handleEnterKey(
						{line: state.line, lIdx: state.lIdx, wIdx: state.wIdx}
					)
				}
            case "text_wrap":
                return {...state, ...stateMods, Keys: genKeys([...state.Keys], 
                    state.line.length + 1, state.Keys.length), ...handleWrap ({
						line: state.line, 
						lIdx: state.lIdx, wIdx: state.wIdx,
						wordWrap: state.wordWrap
                })}
            case "hide-caret":
                return {...state, caretOn: state.caretOn=false};
            case "show-caret":
                return {...state, caretOn: state.caretOn=true};
            case "set-timer-on":
                return {...state, timerOn: state.timerOn=true};
            default:
                /// Update state values...
                return {...state, ...stateMods, ...updateLine(
                    action.type, state.line, state.lIdx, state.wIdx
                )}
            }
            
    }
        catch (e) {
        console.log(state)
    }

}
