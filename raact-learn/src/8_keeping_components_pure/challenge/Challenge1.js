/**
 * 고장난 시계를 고쳐보세요
 *
 * 이 컴포넌트는 자정부터 아침 6시까지의 시간에는 <h1>의 CSS 클래스를 "night"로 설정하고
 * 그 외에 시간에는 "day"로 설정하려고 합니다. 하지만 이건 동작하지 않습니다. 이 컴포넌트를 고칠 수 있나요?
 *
 * 컴퓨터의 시간대를 일시적으로 변경하여 정답이 동작하는지 확인할 수 있습니다.
 * 현재 시간이 자정에서 아침 6시 사이이면 시계의 색상이 반전되어야 합니다!
 */
export default function Clock({ time }) {
    let hours = time.getHours();
    let className;
    if (hours >= 0 && hours <= 6) {
        className = 'night';
    } else {
        className = 'day';
    }
    return (
        <h1 className={className}>
            {time.toLocaleTimeString()}
        </h1>
    );
}