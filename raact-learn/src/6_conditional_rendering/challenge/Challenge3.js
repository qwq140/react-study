/**
 * 변수와 일련의 ? :를 if로 리팩토링합니다.
 *
 * Drink 컴포넌트는 일련의 ? : 조건을 사용하여 name props가 tea인지 coffee인지에 따라 다른 정보를 표시합니다.
 * 문제는 각 음료에 대한 정보가 여러 가지 조건에 걸쳐 퍼져 있다는 것입니다.
 * 세 가지 ? : 조건 대신 하나의 if 문을 사용하도록 이 코드를 리팩토링하세요.
 */
function Drink({ name }) {
    let part, content, age;


    if(name === 'tea') {
        part = 'leaf';
        content = '15–70 mg/cup';
        age = '4,000+ years';
    } else {
        part = 'bean';
        content = '80–185 mg/cup';
        age = '1,000+ years';
    }

    return (
        <section>
            <h1>{name}</h1>
            <dl>
                <dt>Part of plant</dt>
                <dd>{part}</dd>
                <dt>Caffeine content</dt>
                <dd>{content}</dd>
                <dt>Age</dt>
                <dd>{age}</dd>
            </dl>
        </section>
    );
}

export default function DrinkList() {
    return (
        <div>
            <Drink name="tea" />
            <Drink name="coffee" />
        </div>
    );
}
