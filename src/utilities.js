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
