/**
 * 챌린지 2 of 2: state 큐를 직접 구현해 보세요.
 * 이번 도전과제에서는 React의 작은 부분을 처음부터 다시 구현하게 됩니다! 생각보다 어렵지 않습니다.
 *
 * 샌드박스 미리보기를 스크롤 하세요. 4개의 테스트 케이스가 표시되는 것을 확인하세요.
 * 이 페이지의 앞부분에서 보았던 예제와 일치합니다.
 * 여러분의 임무는 각 케이스에 대해 올바른 결과를 반환하도록 getFinalState 함수를 구현하는 것입니다.
 * 올바르게 구현하면 네 가지 테스트를 모두 통과할 것입니다.
 *
 * 두 개의 인수를 받게 됩니다.
 * baseState는 초기 state(예: 0)이고,
 * queue는 숫자(예: 5)와 업데이터 함수(예: n => n + 1)가 추가된, 순서대로 섞여 있는 배열입니다.
 *
 * 여러분의 임무는 이 페이지의 표에 표시된 것처럼 최종 state를 반환하는 것입니다!
 */
import { getFinalState } from './processQueue.js';

function increment(n) {
    return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
    return (
        <>
            <TestCase
                baseState={0}
                queue={[1, 1, 1]}
                expected={1}
            />
            <hr />
            <TestCase
                baseState={0}
                queue={[
                    increment,
                    increment,
                    increment
                ]}
                expected={3}
            />
            <hr />
            <TestCase
                baseState={0}
                queue={[
                    5,
                    increment,
                ]}
                expected={6}
            />
            <hr />
            <TestCase
                baseState={0}
                queue={[
                    5,
                    increment,
                    42,
                ]}
                expected={42}
            />
        </>
    );
}

function TestCase({
                      baseState,
                      queue,
                      expected
                  }) {
    const actual = getFinalState(baseState, queue);
    return (
        <>
            <p>Base state: <b>{baseState}</b></p>
            <p>Queue: <b>[{queue.join(', ')}]</b></p>
            <p>Expected result: <b>{expected}</b></p>
            <p style={{
                color: actual === expected ?
                    'green' :
                    'red'
            }}>
                Your result: <b>{actual}</b>
                {' '}
                ({actual === expected ?
                'correct' :
                'wrong'
            })
            </p>
        </>
    );
}
