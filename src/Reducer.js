//////////////////////////////////////////////////////////////////////
//////////      This file handles all State Modifications    ////////
/////////////////////////////////////////////////////////////////////

import {
    Backspace, updateLine, spaceBar, handleEnterKey, handleWrap, genKeys,
	handleArrowLeft, handleArrowRight, handleArrowUp, handleArrowDown,
} from './utilities.js'

export default function modifier(state, action)
{
    try {
        /// Stops the caret from blinking...
        const stateMods = {
            caretOn: true, timerOn: false, wordWrap: true,
        }
		console.log(state)
        switch (action.type)
        {
            case "Backspace":
             // Calls the Function that handles backspaces 
                /// Update state values...
                return {...state, ...stateMods, ...Backspace(state)}
            case " ":
            // Calls the fucntion that handles input from the spacebar
                /// Update state values...
                return {...state, ...stateMods, ...spaceBar(state)}
            case "ArrowLeft":
				return {...state, ...stateMods, ...handleArrowLeft(state)}
            case "ArrowRight":
				return {...state, ...stateMods, ...handleArrowRight(state)}
			case "ArrowUp":
				return {...state, ...stateMods, ...handleArrowUp(state)}
            case "ArrowDown":
				return {...state, ...stateMods, ...handleArrowDown(state)}
            case "Enter":
				return {...state, ...stateMods, Keys: genKeys(state),
					...handleEnterKey(state)}
            case "text_wrap":
                return {...state, ...stateMods, Keys: genKeys([...state.Keys], 
                    state.line.length + 1, state.Keys.length), ...handleWrap(state)}
            case "hide-caret":
                return {...state, caretOn: state.caretOn=false};
            case "show-caret":
                return {...state, caretOn: state.caretOn=true};
            case "set-timer-on":
                return {...state, timerOn: state.timerOn=true};
            default:
                /// Update state values...
                return {...state, ...stateMods, ...updateLine(action.type, state)}
            }
            
    }
	catch (e) {
        console.log(state)
    }

}
