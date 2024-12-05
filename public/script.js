document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
  
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, age }),
    });
  
    if (response.ok) {
      document.getElementById('confirmationMessage').innerText = 'Submission successful!';
    } else {
      document.getElementById('confirmationMessage').innerText = 'Submission failed. Try again.';
    }
  });
  