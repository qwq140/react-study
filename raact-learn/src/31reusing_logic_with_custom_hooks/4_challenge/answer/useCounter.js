import { useState } from 'react';
import { useInterval } from './useInterval.js';

export function useCounter(delay) {
    const [count, setCount] = useState(0);
    useInterval(() => {
        console.log('✅ Setting up an interval with delay ', delay)
        setCount(c => c + 1);
    }, delay);
    return count;
}
