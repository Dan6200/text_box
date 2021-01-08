//////////////////////////////////////////////////////////////////////
//////////       This file handles all Keyboard operations //////////
/////////////////////////////////////////////////////////////////////

const cpyMatrix = array => array.map(elem => [...elem])

export default function handleKeyPress 
    (e, line, setLine, lIdx, setLIdx, wIdx, setWIdx)  
{
    try {
        if (e.key === "Backspace")
        {   
            // Calls the Function that handles backspaces 
            
            let {           // Declare new state values...
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
        }
        else if (e.keyCode === 32)
        {
            /// Modify state values...
            const {nLine, nLIdx, nWIdx} = spaceBar(e, {line: cpyMatrix(line), lIdx, wIdx})
            /// Update state values...
            setLine(nLine)
            setLIdx(nLIdx)
            setWIdx(nWIdx)
        }
        else {
            /// Modify state values...
            const {nLine, nLIdx, nWIdx} = updateLine(e, cpyMatrix(line), lIdx, wIdx)
            /// Update state values...
            setLine(nLine)
            setLIdx(nLIdx)
            setWIdx(nWIdx)
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
    line[lIdx].push('\x20\u200c')
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
        line[lIdx].push(e.key)
        wIdx++
        console.log(wIdx)
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

    if (line.length <= 1 && line[lIdx].length <= 1)
    {
        line[0] = [""]
        lIdx = 0
    }
    else {
        line[lIdx].pop()
        if (wIdx > 0) 
            wIdx-- 
        else
            lIdx--
    }
    return {
        nLine: line,
        nLIdx: lIdx,
        nWIdx: wIdx
    }
}
