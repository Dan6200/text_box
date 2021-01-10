//////////////////////////////////////////////////////////////////////
//////////       This file handles all Keyboard operations //////////
/////////////////////////////////////////////////////////////////////

const cpyMatrix = array => array.map(elem => [...elem])

export default function handleKeyPress 
    (e, {line, setLine, lIdx, setLIdx, wIdx, setWIdx, textRef, paraRef, setTimer, showCaret})  
{
    try {
        /// Stops the caret from blinking...
        showCaret(true)
        setTimer(false)
        switch (e.key) {
            case "Backspace":
            { // Calls the Function that handles backspaces 
                const {           // Declare new state values...
                    nLine,
                    nLIdx,
                    nWIdx
                } = Backspace({   /// Modify state values...
                    line: cpyMatrix(line),
                    lIdx,
                    wIdx
                })
                /// Update state values...
                setLine(nLine)
                setLIdx(nLIdx)
                setWIdx(nWIdx)
                break
            }
            case " ":
            {
            // Calls the fucntion that handles input from the spacebar
                /// Modify state values...
                const {nLine, nLIdx, nWIdx} = spaceBar(e, {line: cpyMatrix(line), lIdx, wIdx})
                /// Update state values...
                setLine(nLine)
                setLIdx(nLIdx)
                setWIdx(nWIdx)
                break
            }
            case "ArrowLeft":
                if (wIdx >= 0)
                    setWIdx(wIdx - 1)
                break
            case "ArrowRight":
                if (wIdx < line[lIdx].length)
                    setWIdx(wIdx + 1)
                break
            default:
            /// Modify state values...
                const {nLine, nLIdx, nWIdx} = 
                    updateLine(e, cpyMatrix(line), lIdx, wIdx)
                /// Update state values...
                setLine(nLine)
                setLIdx(nLIdx)
                setWIdx(nWIdx)
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
        nLine: line,
        nLIdx: lIdx,
        nWIdx: wIdx + 1
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
        nLine: line,
        nLIdx: lIdx,
        nWIdx: wIdx 
    }
}

function Backspace(obj) {
    let {
        line, 
        lIdx,
        wIdx
    } = obj;

    if (wIdx > -1 && line[lIdx].length > 0) 
    {
        line[lIdx].splice(wIdx,1)
        wIdx-- 
    }
    else
        if (lIdx) lIdx--
    return {
        nLine: line,
        nLIdx: lIdx,
        nWIdx: wIdx
    }
}
