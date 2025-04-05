const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    messageDiv.textContent = data.message || 'Registered successfully';
  } catch (err) {
    messageDiv.textContent = 'Error registering user';
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      messageDiv.textContent = `Login successful! Welcome, ${data.user.name}`;
      localStorage.setItem('token', data.token); // Save token if needed
    } else {
      messageDiv.textContent = data.message || 'Login failed';
    }
  } catch (err) {
    messageDiv.textContent = 'Error logging in';
  }
});
