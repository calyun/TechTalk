async function deletePost(event) {
    event.preventDefault();
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const response = await fetch('/blogRoutes/' + post_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
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
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deletePost);
document.querySelector('#save-btn').addEventListener('click', savePost);