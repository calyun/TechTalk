async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
        console.log('no good');
      } else {
        alert(response.statusText);
        //not logged in
      }
}

document.querySelector('#logout-btn').addEventListener('click', logout);