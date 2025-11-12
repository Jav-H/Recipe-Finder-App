const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    if (!searchValue) return;

    // Calling backend API
    const url = `http://127.0.0.1:8000/api/search?query=${encodeURIComponent(searchValue)}&number=10`;

    const response = await fetch(url);
    if (!response.ok) {
        resultList.innerHTML = '<p>Sorry, something went wrong.</p>';
        return;
    }
    const data = await response.json(); // array of recipes
    displayRecipes(Array.isArray(data) ? data : (data.results || []));
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        const title = recipe.title || 'Untitled';
        const id = recipe.id;
        const img = recipe.image || '';

        html += `
        <div>
            <img src="${img}" alt="${escapeHtml(title)}">
            <h3>${escapeHtml(title)}</h3>
            <a href="https://spoonacular.com/recipes/${slugify(title)}-${id}" target="_blank" rel="noopener">
                View Recipe
            </a>
        </div>
        `;
    });

    resultList.innerHTML = html || '<p>No results.</p>';
}

function slugify(s) {
    return encodeURIComponent(String(s).trim().replace(/\s+/g, '-'));
}

function escapeHtml(str) {
    return String(str).replace(/[&<>`]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
