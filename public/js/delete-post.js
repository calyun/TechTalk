async function deletePost(event) {
    event.preventDefault();
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
    console.log("POST ID" + post_id);
    const response = await fetch('/blogRoutes/' + post_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
}

function editPost(){
    //clean up
    document.querySelector("#post-title").setAttribute('style', 'display: none');
    document.querySelector("#post-body").setAttribute('style', 'display: none');
    document.querySelector('#new-title').setAttribute('style', 'display: block');
    document.querySelector('#new-body').setAttribute('style', 'display: block');
    document.querySelector('#edit-btn').setAttribute('style', 'display: none');
    document.querySelector('#save-btn').setAttribute('style', 'visibility: visible');
}

async function savePost(event) {
    event.preventDefault();
    const title = document.querySelector("#new-title").value.trim();
    const body = document.querySelector("#new-body").value.trim()
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
    const response = await fetch('/blogRoutes/' + post_id, {
        method: "PUT",
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
      document.location.replace('/blogRoutes/' + post_id);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deletePost);
document.querySelector('#edit-btn').addEventListener('click', editPost);
document.querySelector('#save-btn').addEventListener('click', savePost);