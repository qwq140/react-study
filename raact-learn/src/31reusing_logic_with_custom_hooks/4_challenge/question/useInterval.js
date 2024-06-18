import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(onTick, delay) {
    useEffect(() => {
        const id = setInterval(onTick, delay);
        return () => {
            clearInterval(id);
        };
    }, [onTick, delay]);
}
