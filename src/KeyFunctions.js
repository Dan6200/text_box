//////////////////////////////////////////////////////////////////////
//////////       This file handles all Keyboard operations //////////
/////////////////////////////////////////////////////////////////////

const cpyMatrix = array => array.map(elem => [...elem])

export default function handleKeyPress 
    (e, line, setLine, lIdx, setLIdx, wIdx, setWIdx, setTimer, showCaret)  
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
                break
            default:
            /// Modify state values...
                values = updateLine(e, cpyMatrix(line), lIdx, wIdx)
                /// Update state values...
                updateState(values, setters)
                console.log(line, lIdx, wIdx)
            }
    }
    catch (e) {
        console.info(e)
        console.log(line, lIdx, wIdx)
    }
}

function spaceBar(e, {line, lIdx, wIdx}) {
    e.preventDefault()
    line[lIdx].splice(wIdx+1,0,'\x20\u200c')
    return {
        newLine: line,
        newLIdx: lIdx,
        newWIdx: wIdx + 1
    }
}

function updateLine(e, line, lIdx, wIdx) {
    e.preventDefault()
    if (e.key.length === 1) 
    {
        line[lIdx].splice(wIdx+1,0,e.key)
        wIdx++
    }
    return {
        newLine: line,
        newLIdx: lIdx,
        newWIdx: wIdx 
    }
}

function Backspace(obj) {
    let {
        line: newLine,
        lIdx: newLIdx,
        wIdx: newWIdx
    } = obj

    if (newWIdx > -1 && newLine[newLIdx].length > 0) 
    {
        newLine[newLIdx].splice(newWIdx,1)
        newWIdx-- 
    }
    else {
        if (newLIdx) 
        {
            newLine.splice(newLIdx, 1)
            newLIdx--
            newWIdx = newLine[newLIdx].length
        }
    }
    return {
        newLine,
        newLIdx,
        newWIdx
    }
}

function updateState(values, setters)
{
    const {newLine, newLIdx, newWIdx} = values
    const {setLine, setLIdx, setWIdx} = setters

    setLine(newLine)
    setLIdx(newLIdx)
    setWIdx(newWIdx)
}

function handleEnterKey(obj) 
{
    const {line, lIdx} = obj
    line.splice(lIdx + 1, 0, [])
    return {
        newLine: line,
        newLIdx: lIdx + 1,
        newWIdx: 0
    }
}


