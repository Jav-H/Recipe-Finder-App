const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const apiKey = '2d4f4cf6ac444a579f9db1398f5ac2cc';
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(searchValue)}&number=10&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultList.innerHTML = html;
}