async function createPost(event) {
    event.preventDefault();
    const title = document.querySelector("#post-title").value.trim();
    const body = document.querySelector("#post-body").value.trim()
    const response = await fetch('/blogRoutes/new', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers : {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}

document.querySelector('#create-post-btn').addEventListener('click', createPost);

function myFunction(event) {
    event.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");
  }
