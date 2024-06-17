/**
 * 챌린지 5 of 5: select box 체인 채우기
 * 이 예제에는 두 개의 select box가 있습니다.
 * 하나의 select box에서 사용자는 행성을 선택할 수 있습니다.
 * 다른 select box는 사용자가 해당 행성의 장소를 선택할 수 있도록 합니다.
 * 두 번째 상자는 아직 작동하지 않습니다. 여러분의 임무는 선택한 행성의 장소를 표시하도록 만드는 것입니다.
 *
 * 첫 번째 select box의 작동 방식을 살펴보겠습니다.
 * 이 상자는 "/planets" API 호출의 결과로 planetList state를 채웁니다.
 * 현재 선택된 행성의 ID는 planetId state 변수에 보관됩니다.
 * placeList state 변수가 "/planets/" + planetId + "/places" API 호출의 결과로 채워지도록 몇 가지 추가 코드를 추가할 위치를 찾아야 합니다.
 *
 * 이 코드를 올바르게 구현하면 행성을 선택하면 장소 목록이 채워져야 합니다.
 * 행성을 변경하면 장소 목록이 변경되어야 합니다.
 */
import { useState, useEffect } from 'react';
import { fetchData } from './api.js';

// 동기화 프로세스
// 1. 첫 번째 선택 상자는 원격 행성 목록에 동기화된다.
// 2. 두 번째 선택 상자는 현재 planetId에 대한 원격 장소 목록과 동기화된다.
// 독립적인 프로세스이므로 두 개의 개별 effect로 분리하는 것이 좋다.
// 코드가 반복적이지만 하나의 effect로 결합하는 것은 좋지않다.
// 반복을 줄이기 위해 커스텀 Hook에 일부 로직을 추출할 수 있다. (useSelectOptions)
export default function Page() {
    const [planetList, setPlanetList] = useState([])
    const [planetId, setPlanetId] = useState('');

    const [placeList, setPlaceList] = useState([]);
    const [placeId, setPlaceId] = useState('');

    useEffect(() => {
        let ignore = false;
        fetchData('/planets').then(result => {
            if (!ignore) {
                console.log('Fetched a list of planets.');
                setPlanetList(result);
                setPlanetId(result[0].id); // 첫 번째 행성을 선택합니다.
            }
        });
        return () => {
            ignore = true;
        }
    }, []);

    useEffect(() => {
        if(planetId === '') return;

        let ignore = false;
        fetchData(`/planets/${planetId}/places`).then(result => {
            if (!ignore) {
                console.log('Fetched a list of places.');
                setPlaceList(result);
                setPlaceId(result[0].id);
            }
        });
        return () => {
            ignore = true;
        }
    }, [planetId]);

    return (
        <>
            <label>
                Pick a planet:{' '}
                <select value={planetId} onChange={e => {
                    setPlanetId(e.target.value);
                }}>
                    {planetList.map(planet =>
                        <option key={planet.id} value={planet.id}>{planet.name}</option>
                    )}
                </select>
            </label>
            <label>
                Pick a place:{' '}
                <select value={placeId} onChange={e => {
                    setPlaceId(e.target.value);
                }}>
                    {placeList.map(place =>
                        <option key={place.id} value={place.id}>{place.name}</option>
                    )}
                </select>
            </label>
            <hr />
            <p>You are going to: {placeId || '???'} on {planetId || '???'} </p>
        </>
    );
}
