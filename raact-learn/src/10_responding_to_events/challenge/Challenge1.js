/**
 * 이 버튼을 클릭하면 페이지 배경이 흰색과 검은색으로 교체되도록 하려 합니다.
 * 그러나 지금은 클릭 시 아무 일도 일어나지 않습니다.
 * 문제를 해결해보세요. (handleClick 내의 로직에 대해선 걱정 마세요. 해당 부분은 정상입니다.)
 *
 * onClick={handleClick()} => onClick={handleClick} 으로 수정함
 */
export default function LightSwitch() {
    function handleClick() {
        let bodyStyle = document.body.style;
        if (bodyStyle.backgroundColor === 'black') {
            bodyStyle.backgroundColor = 'white';
        } else {
            bodyStyle.backgroundColor = 'black';
        }
    }

    return (
        <button onClick={handleClick}>
            Toggle the lights
        </button>
    );
}
