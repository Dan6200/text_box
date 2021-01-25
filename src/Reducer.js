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
        const keyMods = {
            caretOn: true, timerOn: false, wordWrap: true,
        }

        const DeepCopy = array => array.map(elem => [...elem]) 

        switch (action.type)
        {
            case "Backspace":
             // Calls the Function that handles backspaces 
                /// Update state values...
                return {...state, ...keyMods, ...Backspace({  
                    line: DeepCopy(state.line), lIdx: state.lIdx, wIdx: state.wIdx
                })}
            case " ":
            // Calls the fucntion that handles input from the spacebar
                /// Update state values...
                return {...state, ...keyMods, ...spaceBar({
                    line: DeepCopy(state.line), lIdx: state.lIdx, wIdx: state.wIdx
                })}
            case "ArrowLeft":
                if (state.wIdx >= 0)
                    return { ...state, ...keyMods, wIdx: state.wIdx - 1}
                break;
            case "ArrowRight":
                if (state.wIdx < state.line[state.lIdx].length)
                    return { ...state, ...keyMods, wIdx: state.wIdx + 1}
                break;
             case "ArrowUp":
                if (state.lIdx >= 0)
                    return { ...state, ...keyMods, lIdx: state.lIdx - 1}
                break;
            case "ArrowDown":
                if (state.lIdx < state.line.length)
                    return { ...state, ...keyMods, lIdx: state.lIdx + 1}
                break;
            case "Enter":
                return {...state, ...keyMods, ...handleEnterKey({
                    line: DeepCopy(state.line), lIdx: state.lIdx, wIdx: state.wIdx
                })}
            case "text_wrap":
                return {...state, ...keyMods, ...handleWrap ({
                    line: DeepCopy(state.line), lIdx: state.lIdx, wIdx: state.wIdx, wordWrap: state.wordWrap
                })}
            case "hide-caret":
                return {...state, caretOn: state.caretOn=false};
            case "show-caret":
                return {...state, caretOn: state.caretOn=true};
            case "set-timer-on":
                return {...state, timerOn: state.timerOn=true};
            case "key-gen":
                return {...state, Key: genKeys(DeepCopy(state.Keys), state.line.length, state.Key.length)}
            default:
                /// Update state values...
                return {...state, ...keyMods, ...updateLine(
                    action.type, DeepCopy(state.line), state.lIdx, state.wIdx
                )}
            }
            
    }
        catch (e) {
        console.info(e)
        console.log(state)
    }
}
