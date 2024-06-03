/**
 * 리스트 항목 컴포넌트 추출하기
 *
 * RecipeList 컴포넌트에는 두 개의 중첩된 map 호출이 포함되어 있습니다.
 * 이를 단순화하기 위해 id, name, ingredients props를 허용하는 Recipe 컴포넌트를 추출합니다.
 * 외부 key를 어디에 위치하고 그 이유는 무엇일까요?
 *
 * key는 Recipe에서 반환된 루트 <div>가 아니라 <Recipe> 자체에 지정된다는 점에 유의하세요.
 * 이는 이 key가 주변 배열의 context 내에서 직접 필요하기 때문입니다.
 * 이전에는 <div> 배열이 있었기 때문에 각 배열에 key가 필요했지만, 지금은 <Recipe> 배열이 있습니다.
 * 즉, 컴포넌트를 추출할 때 복사하여 붙여넣은 JSX 외부에 key를 남겨두는 것을 잊지 마세요.
 */
import { recipes } from './data.js';

function Recipe({id, name, ingredients}) {
    return (
        <div>
            <h2>{name}</h2>
            <ul>
                {ingredients.map(ingredient =>
                    <li key={ingredient}>
                        {ingredient}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default function RecipeList() {
    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map(recipe =>
                <Recipe {...recipe} key={recipe.id}/>
            )}
        </div>
    );
}
