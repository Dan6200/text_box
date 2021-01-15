import {useRef, useEffect} from 'react'

export const useInterval = (func, delay, start) => {
	const callback = useRef()

    useEffect(() => {
		callback.current = func
    }, [func])

	useEffect(() => {
        if (start === true) {
			const id = setInterval(() => callback.current(), delay)
			return () => clearInterval(id)	
		}
	}, [delay, start])
	
}

export function spaceBar(e, {line, lIdx, wIdx}) {
    e.preventDefault()
    line[lIdx].splice(wIdx,0,'\x20\u200c')
    return {
        newLine: line,
        newLIdx: lIdx,
        newWIdx: wIdx + 1
    }
}

export function updateLine(e, line, lIdx, wIdx) {
    e.preventDefault()
    if (e.key.length === 1) 
    {
        line[lIdx].splice(wIdx,0,e.key)
    }
    return {
        newLine: line,
        newLIdx: lIdx,
        newWIdx: wIdx + 1
    }
}

export function Backspace(obj) {
    let {
        line: newLine,
        lIdx: newLIdx,
        wIdx: newWIdx
    } = obj

    if (newWIdx > -1 && newLine[newLIdx].length > 0) 
    {
        newLine[newLIdx].splice(newWIdx-1,1)
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

export function updateState(values, setters)
{
    const {newLine, newLIdx, newWIdx} = values
    const {setLine, setLIdx, setWIdx} = setters

    setLine(newLine)
    setLIdx(newLIdx)
    setWIdx(newWIdx)
}

export function handleEnterKey(obj) 
{
    const {line, lIdx, wIdx} = obj
    const nl = line[lIdx].slice(wIdx)
    line[lIdx] = line[lIdx].slice(0, wIdx)
    line.splice(lIdx + 1, 0, nl)
    return {
        newLine: line,
        newLIdx: lIdx + 1,
        newWIdx: 0
    }
}
