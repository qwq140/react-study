export function getFinalState(baseState, queue) {
    let finalState = baseState;

    // TODO: do something with the queue...
    for(let update of queue) {
        // 업데이터 함수 여부 판단
        if(typeof update === 'function'){
            finalState = update(finalState);
        } else {
            finalState = update;
        }
    }

    return finalState;
}
