// Hook을 여기에 작성하세요!
import {useEffect} from "react";

export function useInterval(onTick, delay) {
    useEffect(() => {
        const id = setInterval(onTick, delay)
        return () => clearInterval(id);
    }, [delay, onTick]);
}