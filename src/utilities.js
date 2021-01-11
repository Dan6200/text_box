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

const primes = [2]
const primeGen = () => {
    const last = primes.length - 1
    let n = primes[last] + 1
    for(let i=0; i < last+1;)
    {
        let p = primes[i]
        if (n % p === 0)
        {
            n++
            i=0
        }
        else
            i++
    }
    primes.push(n)
    return primes[last]
}

export const keyGen = () => {
    const N = 5557          // prime number
    return N * primeGen()   // return the two primes product as key
}
