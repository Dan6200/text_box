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
        if (!line.[lIdx].length && line.length > 1) 
            line.splice(lIdx, 1)
		if (lIdx > 0) {
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
	/* Line Wrapping Algorithm: 
		creates line breaks if there is no space left in a line */
    const {line, lIdx, wIdx} = obj
	debugger
    let lastWord = []
    let array = line[lIdx] 
    let i= array.length-1
	/// Break at a space character if you can
    while (array[i] !== '\x20\u200c' && i >= 0) i--
	let newWIdx = 0
    if (i < 0) i = array.length - 3
	// Save the horizontal position of the cursor before wrapping
	newWIdx = wIdx - i
	lastWord = array.splice(i, array.length - i + 1)
    line.splice(lIdx+1, 0, lastWord)
	// Change cursor pos, if at the end of the line.
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

let font_size
let TEST
export function reverseWrap(state) 
{
	/*	 Reverse Wrapping Algorithm:
		  greedily maximizes the amount of words that can fit in a 
	      line with line breaks								 		*/

	/* TODO:
		Algorithm:
		  - Estimate the font size
		  - Figure out how much chars can fit in a paragraph element
		  - Estimate how to minimize whitespace in each paragraph by filling the span
		  	elements with characters from the next line
	*/

	const p_element = document.querySelector('#txtbox > p')
	if (!font_size)
		font_size = getComputedStyle(p_element).fontSize
	console.log(font_size)
	if (!TEST)
	{
		const TEST = document.getElementById('test')
		TEST.style.fontSize = font_size
	}
	const WIDTH = TEST.clientWidth
	const WIDTH_PER_CHAR = WIDTH / 52
	// Find how much space is left
	const span_element = document.querySelector('#txtbox > p > span')
	const P_WIDTH = p_element.clientWidth
	const SPAN_WIDTH = span_element.offsetWidth
	const DIFF = P_WIDTH - SPAN_WIDTH
}

export function handleArrowLeft(state) {
	const {line, lIdx, wIdx} = state
	// Bounding inputs
	let {newLidx, newWidx} = boundingInputHlper(state)
	if (wIdx > 0) {
		newWidx = wIdx - 1
	}
	else if (lIdx > 0) {
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
	if (lIdx > 0) 
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
	newLidx = (lIdx < line.length) ? newLidx : line.length-1
	newWidx = (wIdx >= 0) ? wIdx : 0
	newWidx = (wIdx <= line[newLidx].length) ? newWidx : line[newLidx].length
	return {newLidx, newWidx}
}

