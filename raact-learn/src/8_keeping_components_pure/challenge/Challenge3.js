/**
 * 챌린지 3 of 3: 깨진 StoryTray를 수리해보세요
 * 회사의 CEO가 온라인 시계 앱에 “stories”를 추가해 달라고 요청했는데 거절할 수 없는 상황입니다.
 * “Create Story” 플레이스홀더 뒤에 stories 목록을 받는 StoryTray컴포넌트를 작성했습니다.
 *
 * 프로퍼티로 받는 stories 배열 끝에 가짜 story를 하나 더 추가해서 “Create Story” 플레이스홀더를 구현했습니다.
 * 하지만 어떤 이유에서인지 “Create Story”는 한 번 이상 등장합니다. 이 문제를 해결해보세요.
 */
export default function StoryTray({ stories }) {
    const newStories = [...stories];

    newStories.push({
        id: 'create',
        label: 'Create Story'
    });

    return (
        <ul>
            {newStories.map(story => (
                <li key={story.id}>
                    {story.label}
                </li>
            ))}
        </ul>
    );
}

// export default function StoryTray({ stories }) {
//     return (
//         <ul>
//             {stories.map(story => (
//                 <li key={story.id}>
//                     {story.label}
//                 </li>
//             ))}
//             <li>Create Story</li>
//         </ul>
//     );
// }