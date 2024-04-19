// userpage.js


var SUPABASE_URL = 'https://chzaizregriqzueqdsnf.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoemFpenJlZ3JpcXp1ZXFkc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NDg1MjgsImV4cCI6MjAyNTAyNDUyOH0.qzX1fVjkYfaFtq-6QzdasJsDyQB00CslprrHPQU5QC8'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
window.userToken = null

async function fetchUserData() {
    // Get the email of the currently logged in user
    const userEmail = supabase.auth.user().email;

    const { data, error } = await supabase
        .from('userinfo')
        .select('*')
        // Filter the data based on the user's email
        .eq('email', userEmail);

    if (error) {
        console.error('Error fetching data', error);
    } else {
        if (data.length > 0) {
            const user = data[0];
            // Update the HTML elements with the fetched data
            document.getElementById('name').textContent = user.name;
            document.getElementById('email').textContent = user.email;
            document.getElementById('allergies').textContent = user.allergies;
            document.getElementById('recipe').textContent = user.recipe;
        }
    }
}
fetchUserData();
// userpage.js

// Event listener for the "Update Details" button
document.getElementById('updateDetailsBtn').addEventListener('click', async () => {
    // Fetch existing user data
    const { data, error } = await supabase
        .from('userinfo')
        .select('*')
        .eq('email', supabase.auth.user().email);

    if (error) {
        console.error('Error fetching user data', error);
        return;
    }

    // Assuming you have input fields with IDs for name, allergies, and recipe
    const nameInput = document.getElementById('name');
    const allergiesInput = document.getElementById('allergies');
    const recipeInput = document.getElementById('recipe');

    // Populate input fields with existing user data
    nameInput.value = data[0].name;
    allergiesInput.value = data[0].allergies;
    recipeInput.value = data[0].recipe;

    // Handle form submission
    document.getElementById('userForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedName = nameInput.value;
        const updatedAllergies = allergiesInput.value;
        const updatedRecipe = recipeInput.value;

        // Update the userinfo table with the new information
        const { error: updateError } = await supabase
            .from('userinfo')
            .update({ name: updatedName, allergies: updatedAllergies, recipe: updatedRecipe })
            .eq('email', supabase.auth.user().email);

        if (updateError) {
            console.error('Error updating user data', updateError);
            return;
        }

        // Clear the existing content
        document.getElementById('userInfo').innerHTML = '';

        // Optionally, display a success message to the user
        alert('User information updated successfully');

        // Fetch and display updated user data
        fetchUserData();
    });
});
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await supabase.auth.signOut();
        // Redirect to the login page or any other desired page
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
});



// logout:
