document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    // Prepare data to send to the server (Node.js backend)
    const formData = {
        name: name,
        email: email,
        age: age
    };

    // Send data to your server (Node.js API)
    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show the success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            alert('Error submitting the form.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }

    // Reset the form
    document.getElementById('userForm').reset();
});
