import {useRef, useEffect} from 'react'
import uuid from 'react-uuid'

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

export const genKeys = state => {
	const {Keys, line} = state
	let howMany = line.length + 1
	let numOfKeys = Keys.length
    if (howMany > numOfKeys)
        while(numOfKeys++ < howMany+5)
            Keys.push(uuid())
    return Keys
}

export function spaceBar({line, lIdx, wIdx}) {
    line[lIdx].splice(wIdx,0,'\x20\u200c')
    return {
        line,
        lIdx,
        wIdx: wIdx + 1
    }
}

export function updateLine(key, state) {
	const {line, lIdx, wIdx} = state
    if (key.length === 1) 
    {
        line[lIdx].splice(wIdx,0,key)
    }
    return {
        line,
        lIdx,
        wIdx: wIdx + 1
    }
}

export function Backspace(obj) {
    let {
        line,
        lIdx,
        wIdx
    } = obj

    if (wIdx && line[lIdx].length > 0) 
    {
        line[lIdx].splice(wIdx-1,1)
        wIdx-- 
    }
    else {
        if (!line.[lIdx].length) 
            line.splice(lIdx, 1)
		if (lIdx) {
			lIdx--
			wIdx = line[lIdx].length
		}
    }
    return {
        line,
        lIdx,
        wIdx
    }
}

export function handleEnterKey(obj) 
{
    const {line, lIdx, wIdx} = obj
    const nl = line[lIdx].slice(wIdx)
    line[lIdx] = line[lIdx].slice(0, wIdx)
    line.splice(lIdx + 1, 0, nl)
    return {
        line,
        lIdx: lIdx + 1,
        wIdx: 0
    }
}

export function handleWrap(obj)
{
	/* --- TODO: This function is Buggy fix this! --- */
    const {line, lIdx, wIdx} = obj
    let lastWord = []
    let array = line[lIdx] 
    let i= array.length-1
    while (array[i] !== '\x20\u200c' && i >= 0) i--
	let newWIdx
    if (i > 0) 
	{
		newWIdx = wIdx - i
        lastWord = array.splice(i, array.length - i + 1)
	}
    line.splice(lIdx+1, 0, lastWord)
	// Save the horizontal position of the cursor before wrapping
	if (wIdx+1 >= line[lIdx].length)
		return {
			line,
			lIdx: lIdx+1,
			wIdx: newWIdx,
			wordWrap: false 
		}
	return {
		line,
		wordWrap: false
	}
}

export function handleArrowLeft(state) {
	const {line, lIdx, wIdx} = state
	// Bounding inputs
	let {newLidx, newWidx} = boundingInputHlper(state)
	if (wIdx) {
		newWidx = wIdx - 1
	}
	else if (lIdx) {
		newLidx = lIdx - 1
		newWidx = line[lIdx - 1].length
	}
	return {
		lIdx : newLidx,
		wIdx : newWidx
	}
}
	
export function handleArrowRight(state) {
	const {line, lIdx, wIdx} = state
	// Bounding inputs
	let {newLidx, newWidx} = boundingInputHlper(state)
	if (wIdx < line[lIdx].length) {
		newWidx = wIdx + 1
	}
	else if (lIdx < line.length - 1) {
		newLidx = lIdx + 1
		newWidx = 0
	}
	return {
		lIdx : newLidx,
		wIdx : newWidx
	}
}

export function handleArrowUp(state) {
	const {line, lIdx, wIdx} = state
	// Bounding inputs
	let {newLidx, newWidx} = boundingInputHlper(state)
	if (lIdx) 
	{
		newLidx = lIdx - 1
		newWidx = wIdx > line[lIdx - 1].length ?
			line[lIdx - 1].length : wIdx
	}
	return {
		lIdx: newLidx,
		wIdx: newWidx
	}
}

export function handleArrowDown(state) {
	const {line, lIdx, wIdx} = state
	// Bounding inputs
	let {newLidx, newWidx} = boundingInputHlper(state)
	if (lIdx < line.length - 1) 
	{
		newLidx = lIdx + 1
		newWidx = wIdx > line[lIdx + 1].length ?
			line[lIdx + 1].length : wIdx
	}
	return {
		lIdx: newLidx,
		wIdx: newWidx
	}
}

function boundingInputHlper(state) {
	const {line, lIdx, wIdx} = state
	let newLidx, newWidx
	newLidx = (lIdx >= 0) ? lIdx : 0
	newLidx = (lIdx < line.length) ? lIdx : line.length-1
	newWidx = (wIdx >= 0) ? wIdx : 0
	newWidx = (wIdx <= line[lIdx].length) ? wIdx : line[lIdx].length
	return {newLidx, newWidx}
}

