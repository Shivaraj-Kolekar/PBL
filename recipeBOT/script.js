const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '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';
const apiUrl = "https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation"; // Replace with your API endpoint

sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    appendMessage('user', userMessage);
    generateRecipe(userMessage);
    userInput.value = '';
  }
});

async function generateRecipe(prompt) {
  try {
    const response = await query({ "inputs": prompt });
    if (response && response.length > 0 && response[0].generated_text) {
      appendMessage('bot', response[0].generated_text);
    } else {
      appendMessage('bot', 'Sorry, no recipe found.');
    }
  } catch (error) {
    console.error('Error:', error);
    appendMessage('bot', 'Sorry, an error occurred while generating the recipe.');
  }
}

async function query(data) {
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer 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`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}/*
function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}*/
function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);

  if (sender === 'bot') {
    try {
      const recipeDetails = message.split(' ');
      const titleIndex = recipeDetails.indexOf('title:');
      const ingredientsIndex = recipeDetails.indexOf('ingredients:');
      const directionsIndex = recipeDetails.indexOf('directions:');

      const title = document.createElement('p');
      title.textContent = 'Title: ' + (titleIndex !== -1 ? recipeDetails.slice(titleIndex + 1, ingredientsIndex).join(' ') : 'Not provided');

      const ingredients = document.createElement('p');
      ingredients.textContent = 'Ingredients:\n' + (ingredientsIndex !== -1 ? recipeDetails.slice(ingredientsIndex + 1, directionsIndex).join('\n') : 'Not provided');

      const directions = document.createElement('p');
      directions.textContent = 'Directions:\n' + (directionsIndex !== -1 ? recipeDetails.slice(directionsIndex + 1).join(' ') : 'Not provided');

      messageElement.appendChild(title);
      messageElement.appendChild(ingredients);
      messageElement.appendChild(directions);
    } catch (error) {
      console.error('Error parsing recipe:', error);
      console.log('Response:', message);
      messageElement.textContent = 'Sorry, an error occurred while parsing the recipe.';
    }
  } else {
    messageElement.innerText = message;
  }

  chatContainer.appendChild(messageElement);
  chatContainer.insertAdjacentHTML('beforeend', '<div>&nbsp;</div>'); // Add non-breaking space for spacing
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}
function togglePopup() {
  var popup = document.getElementById("popup");
  if (popup.style.display === "none") {
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
}
