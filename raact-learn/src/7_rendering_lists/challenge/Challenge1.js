import {people} from "./data";
import {getImageUrl} from "./utils";

/**
 * 리스트를 둘로 나누기
 *
 * 두 개의 개별 리스트 Chemists와 Everyone Else을 차례로 표시하도록 변경하세요.
 * 이전과 마찬가지로 person.profession === 'chemist'를 확인하여 어떤 사람이 chemist인지 확인할 수 있습니다.
 */
export default function List() {
    const chemists = people.filter(person => person.profession === 'chemist');
    const everyoneElse = people.filter(person => person.profession !== 'chemist');
    return (
        <article>
            <h1>Chemists</h1>
            <ul>
                {chemists.map(person =>
                    <li key={person.id}>
                        <img
                            src={getImageUrl(person)}
                            alt={person.name}
                        />
                        <p>
                            <b>{person.name}:</b>
                            {' ' + person.profession + ' '}
                            known for {person.accomplishment}
                        </p>
                    </li>)}
            </ul>
            <h1>Everyone Else</h1>
            <ul>
                {everyoneElse.map(person =>
                    <li key={person.id}>
                        <img
                            src={getImageUrl(person)}
                            alt={person.name}
                        />
                        <p>
                            <b>{person.name}:</b>
                            {' ' + person.profession + ' '}
                            known for {person.accomplishment}
                        </p>
                    </li>)}
            </ul>
        </article>
    );
}