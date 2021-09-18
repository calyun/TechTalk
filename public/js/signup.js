const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#icon_email').value.trim();
  const password = document.querySelector('#icon_password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#sign-up')
document.addEventListener('submit', signupFormHandler);