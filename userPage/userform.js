var SUPABASE_URL = 'https://chzaizregriqzueqdsnf.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoemFpenJlZ3JpcXp1ZXFkc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NDg1MjgsImV4cCI6MjAyNTAyNDUyOH0.qzX1fVjkYfaFtq-6QzdasJsDyQB00CslprrHPQU5QC8'

  var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// Function to insert user data
document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('floating_name').value;
    const email = document.getElementById('floating_email').value;
    const recipe = document.getElementById('floating_recipe').value;
    const allergies = document.getElementById('floating_allergy').value;

    // Insert user data into the "userinfo" table
    const { data, error } = await supabase
        .from('userinfo')
        .insert([
            { name: name, email: email, recipe: recipe, allergies: allergies }
        ]);

    if (error) {
        console.error('Error inserting data', error);
    } else {
        console.log('Data inserted', data);
        // Clear the form fields after successful submission
        document.getElementById('userForm').reset();
    }
});

// Function to update user data
document.getElementById('updateDetailsBtn').addEventListener('click', async () => {
    const name = document.getElementById('floating_name').value;
    const email = document.getElementById('floating_email').value;
    const recipe = document.getElementById('floating_recipe').value;
    const allergies = document.getElementById('floating_allergy').value;

    // Update user data in the "userinfo" table
    const { data, error } = await supabase
        .from('userinfo')
        .update({ name: name, recipe: recipe, allergies: allergies })
        .eq('email', email);

    if (error) {
        console.error('Error updating data', error);
    } else {
        console.log('Data updated', data);
        // Optionally, display a success message to the user
        alert('User information updated successfully');
    }
});