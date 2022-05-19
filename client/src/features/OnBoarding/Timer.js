import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const { initialSeconds = 0, fire } = props;
    const [minutes, setMinutes] = useState(Math.floor(initialSeconds / 60));
    const [seconds, setSeconds] = useState(initialSeconds % 60);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    if (typeof fire == "function") fire();

                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>

        </div>
    )
}

export default Timer;