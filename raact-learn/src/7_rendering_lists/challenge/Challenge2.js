/**
 * 하나의 컴포넌트에 중첩된 리스트
 *
 * 이 배열에서 레시피 리스트를 만들어 보세요! 배열의 각 레시피에 대해 이름을 <h2>로 표시하고 재료를 <ul>에 나열합니다.
 */

import { recipes } from './data.js';

export default function RecipeList() {
    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map(recipe => <div key={recipe.id}>
                <h2>{recipe.name}</h2>
                <ul>
                    {recipe.ingredients.map(ingredient =>
                        <li key={ingredient}>
                            {ingredient}
                        </li>
                    )}
                </ul>
            </div>)}
        </div>
    );
}
