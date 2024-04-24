const fetchCocktails = async () => {
    const url = "https://sysshrty.github.io/CSCE242/json/menu.json";
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error(error);
        // Handle error
    }
};

const displayCocktails = async () => {
    const cocktailList = await fetchCocktails();
    const cocktailMenu = document.getElementById("cocktail-menu");
    cocktailList.forEach((cocktail) => {
        cocktailMenu.append(createCocktailElement(cocktail));
    });
};

const createCocktailElement = (cocktail) => {
    const cocktailItem = document.createElement("div");
    cocktailItem.classList.add("cocktail-item");

    const cocktailName = document.createElement("h2");
    cocktailName.textContent = cocktail.name;
    cocktailItem.appendChild(cocktailName);

    const cocktailImage = document.createElement("img");
    cocktailImage.src = `images/${cocktail.img_name}`;
    cocktailImage.alt = cocktail.name;
    cocktailItem.appendChild(cocktailImage);

    const cocktailDescription = document.createElement("p");
    cocktailDescription.textContent = cocktail.description;
    cocktailItem.appendChild(cocktailDescription);

    const cocktailPrice = document.createElement("p");
    cocktailPrice.textContent = `Price: ${cocktail.price}`;
    cocktailItem.appendChild(cocktailPrice);

    const cocktailIngredients = document.createElement("p");
    cocktailIngredients.textContent = `Ingredients: ${cocktail.ingredients.join(", ")}`;
    cocktailItem.appendChild(cocktailIngredients);

    const cocktailCategory = document.createElement("p");
    cocktailCategory.textContent = `Category: ${cocktail.category}`;
    cocktailItem.appendChild(cocktailCategory);

    const cocktailAlcoholContent = document.createElement("p");
    cocktailAlcoholContent.textContent = `Alcohol Content: ${cocktail.alcohol_content}`;
    cocktailItem.appendChild(cocktailAlcoholContent);

    const cocktailServingSize = document.createElement("p");
    cocktailServingSize.textContent = `Serving Size: ${cocktail.serving_size}`;
    cocktailItem.appendChild(cocktailServingSize);

    return cocktailItem;
};

window.onload = () => displayCocktails();
