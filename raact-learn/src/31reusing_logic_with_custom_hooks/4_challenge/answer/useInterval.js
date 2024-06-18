import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

// onTick을 의존성에서 제거하기 위해 Effect Event로 감싼다.
export function useInterval(callback, delay) {
    const onTick = useEffectEvent(callback);

    useEffect(() => {
        const id = setInterval(onTick, delay);
        return () => {
            clearInterval(id);
        };
    }, [delay]);
}
