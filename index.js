/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
//function addGamesToPage(games) {

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
//}
function addGamesToPage(games) {
            // Clear the games container
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.innerHTML = "";
          
            // Loop over each game in the games array
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
          
              // Create a new div element, which will represent a game card
        const gameCard = document.createElement("div");
          
              // Add the class game-card to the new div
        gameCard.classList.add("game-card");
          
              // Set the inner HTML using a template literal to display some info about each game
              // Note that we must use backticks to use template literals, not single quotes.
        gameCard.innerHTML = `
         <img src="${game.img}" class="game-img" />
         <h3>${game.name}</h3>
         <p>${game.description}</p>
         <p>Pledged: $${game.pledged.toLocaleString()}</p>
         <p>Goal: $${game.goal.toLocaleString()}</p>
         <p>Backers: ${game.backers.toLocaleString()}</p>
         `;
          
              // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
} 

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// Call the function with the GAMES_JSON variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// Assuming you have an HTML element with the id 'contributionsCard'
// const contributionsCard = document.getElementById('contributionsCard');

// Use reduce to calculate the total number of contributions
const totalContributors = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers; }, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
// Update the contributionsCard element with the result
if (contributionsCard) {
    contributionsCard.textContent = `Total Contributors: ${totalContributors.toLocaleString()}`;
} else {
    console.error("Element with id 'contributionsCard' not found.");
}
console.log(totalContributors);

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged; }, 0);

// set inner HTML using template literal
if (raisedCard) {
        raisedCard.textContent = `Total Contributions: \$${totalRaised.toLocaleString()}`;
} else {
        console.error("Element with id 'raisedCard' not found.");
}
console.log(totalRaised);

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + 1; }, 0);
if (gamesCard) {
        gamesCard.textContent = `Total Games: ${totalGames.toLocaleString()}`;
} else {
        console.error("Element with id 'gamesCard' not found.");
}
console.log(totalGames);

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    return unfundedGames
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter( (game) => game.pledged >= game.goal );

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    return fundedGames
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Event listener for fundedBtn
fundedBtn.addEventListener('click', () => {
    const fundedGames = filterFundedOnly(); // Assuming these functions don't need parameters
    console.log("Funded Games:", fundedGames);
});

  // Event listener for unfundedBtn
unfundedBtn.addEventListener('click', () => {
    const unfundedGames = filterUnfundedOnly();
    console.log("UnFunded Games:", unfundedGames);
});

  // Event listener for allBtn
allBtn.addEventListener('click', () => {
    showAllGames()
    console.log("All Games:", GAMES_JSON);
});


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const totalUnfunded = unfundedGames.reduce( (accumulator, game) => {
    return accumulator + game.pledged; }, 0 );
const numberUnfunded = unfundedGames.reduce((accumulator, game) => {
    return accumulator + 1; }, 0);
console.log(unfundedGames)
console.log(totalUnfunded);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of \$${totalRaised.toLocaleString()} has been raised for ${totalGames}
${totalGames === 1 ? 'game' : 'games'}. Currently, ${numberUnfunded}
${numberUnfunded === 1 ? 'game' : 'games'} remain unfunded. We need your help to fund these amazing
games!`

if (descriptionContainer) {
    // Append the new text to the existing content of the container
    descriptionContainer.innerHTML += displayStr;
  } else {
    console.error("Description container not found.");
  }
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames)
// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
if (firstGameContainer) {
    const firstGameNameElement = document.createElement("p");
    firstGameNameElement.textContent = `Top Pledged Game: ${firstGame.name}`;
    firstGameContainer.appendChild(firstGameNameElement);
} else {
    console.error("first-game container not found.");
}

// create a new element to hold the name of the second top pledge game, then append it to the correct element
// do the same for the runner up item
if (secondGameContainer) {
    const secondGameNameElement = document.createElement("p");
    secondGameNameElement.textContent = `Second Top Pledged Game: ${secondGame.name}`;
    secondGameContainer.appendChild(secondGameNameElement);
} else {
    console.error("second-game container not found.");
}
