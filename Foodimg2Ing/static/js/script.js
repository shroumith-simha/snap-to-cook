function displayResults(data) {
    const resultsColumn = document.querySelector('.results-column');
    resultsColumn.innerHTML = `
        <div class="recipe-output">
            <div class="recipe-header">
                <h2 class="recipe-title">${data.recipe_name}</h2>
            </div>
            <div class="recipe-content">
                <div class="recipe-section">
                    <h3 class="recipe-section-title">
                        <i class="fas fa-list"></i>
                        Ingredients
                    </h3>
                    <ul class="ingredients-list">
                        ${data.ingredients.map(ingredient => `
                            <li>
                                <i class="fas fa-circle"></i>
                                ${ingredient}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="recipe-section">
                    <h3 class="recipe-section-title">
                        <i class="fas fa-utensils"></i>
                        Instructions
                    </h3>
                    <ol class="steps-list">
                        ${data.instructions.map(instruction => `
                            <li>${instruction}</li>
                        `).join('')}
                    </ol>
                </div>
            </div>
            <div class="recipe-footer">
                <p>Enjoy your delicious meal!</p>
            </div>
        </div>
    `;
} 