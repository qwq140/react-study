import {Fragment} from "react";

/**
 * 구분 기호가 있는 리스트
 *
 * 이 예제는 Tachibana Hokushi 의 유명한 하이쿠(일본의 정형시)를 렌더링하며,
 * 각 행은 <p> 태그로 래핑되어 있습니다. 여러분이 해야 할 일은 각 단락 사이에 <hr /> 구분 기호를 삽입하는 것입니다.
 * 결과 구조는 다음과 같아야 합니다.
 *
 * <article>
 *   <p>I write, erase, rewrite</p>
 *   <hr />
 *   <p>Erase again, and then</p>
 *   <hr />
 *   <p>A poppy blooms.</p>
 * </article>
 */
const poem = {
    lines: [
        'I write, erase, rewrite',
        'Erase again, and then',
        'A poppy blooms.'
    ]
};

export default function Poem() {
    return (
        <article>
            {poem.lines.map((line, index) =>
                <Fragment key={index}>
                    <p>{line}</p>
                    {index < poem.lines.length-1 && <hr/>}
                </Fragment>
            )}
        </article>
    );
}

// 추가 풀이
// export default function Poem() {
//     let output = [];
//
//     // 출력할 배열을 작성합니다.
//     poem.lines.forEach((line, i) => {
//         output.push(
//             <hr key={i + '-separator'} />
//         );
//         output.push(
//             <p key={i + '-text'}>
//                 {line}
//             </p>
//         );
//     });
//     // 첫 번째 <hr />을 삭제합니다.
//     output.shift();
//
//     return (
//         <article>
//             {output}
//         </article>
//     );
// }
