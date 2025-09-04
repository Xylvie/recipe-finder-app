const userInput = document.getElementById('user-input');
const searchBtn = document.getElementById('searchBtn');
const recipeResult = document.querySelector('.recipe-result');

async function getRecipe() {
    let userData = userInput.value;
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userData}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
       
        
        
        if (data.meals) {
            recipeResult.innerHTML = data.meals.map(meal => `
                <div class="recipe">
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                </div>
            `).join('');

            saveData()
        } else {
            recipeResult.innerHTML = '<p class="error">No recipes found. Please try another search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching the recipe:', error);
        recipeResult.innerHTML = '<p class="error">Failed to fetch recipes. Please try again later.</p>';
    }
};

searchBtn.addEventListener('click', () => {
    if (userInput.value === ""){
        alert("Please enter a valid input");
        userInput.value = "";
    } else {
        getRecipe();
        userInput.value = "";
    }
} );

function saveData() {
    localStorage.setItem("result", recipeResult.innerHTML);
}

function displayData() {
   const saveData = localStorage.getItem("result");

    if (saveData) {
        recipeResult.innerHTML = saveData;
    }
}

displayData();