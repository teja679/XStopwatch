import React, { useEffect, useRef, useState } from 'react'
import './styles.css'

const Stopwatch = () => {
    const [timer, setTimer] = useState(0)
    const [isStarted, setIsStarted] = useState(false)
    const timerId = useRef()
    const handleTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);

        return `${min}:${sec > 9 ? sec : (sec > 0 ? "0" + sec : "00")}`
    }
    const handleStart = () => {
        if (!isStarted) {
            timerId.current = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 1000)

        } else {
            clearInterval(timerId.current)
            timerId.current = null;
        }
        setIsStarted(!isStarted)
    }
    const handleReset = () => {
        clearInterval(timerId.current)
        setTimer(0)
        setIsStarted(false)
    }
    useEffect(() => {
        return () => clearInterval(timerId.current)
    }, [])
    return (
        <div className='stopwatch-div'>
            <h2>Stopwatch</h2>
            <div>
                Time: {handleTime(timer)}
            </div>
            <div className='btns'>
                <button onClick={handleStart}>{!isStarted ? 'Start' : 'Stop'}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch
