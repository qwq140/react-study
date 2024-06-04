/**
 * 아래 ColorSwitch 컴포넌트는 버튼을 렌더링합니다.
 * 이 버튼을 통해 페이지 색을 변경하고자 합니다.
 * 버튼을 클릭하면 색이 변화할 수 있도록 부모로부터 받은 onChangeColor 이벤트 핸들러 prop에 연결하세요.
 *
 * 위 작업을 마치면 해당 버튼을 클릭하는 것이 페이지 클릭 카운터의 수치 또한 증가시킴을 확인할 수 있습니다.
 * 부모 컴포넌트를 작성한 여러분의 동료는 onChangeColor가 어떠한 카운터 수치도 증가시키지 않는다고 주장하네요.
 * 왜 이런 일이 발생한 걸까요? 버튼을 클릭하면 색상만 변경되고, 카운터 수치는 증가하지 않도록 수정하세요.
 */
export default function ColorSwitch({onChangeColor}) {
    return (
        <button onClick={(e)=>{
            e.stopPropagation();
            onChangeColor();
        }}>
            Change color
        </button>
    );
}