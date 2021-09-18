async function createReply(event) {
    console.log('click');
    event.preventDefault();
    const text = document.querySelector('#reply').value.trim();
    const post_id = (window.location.toString().split('/')[4].split('?')[0]);
    console.log(text)
    console.log(post_id);
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    var today = new Date();
    date = (today.toLocaleDateString("en-US", options));
    const response = await fetch ('/blogRoutes/reply', {
        method: 'POST',
        body: JSON.stringify({
            text,
            post_id,
            date,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#reply-btn').addEventListener('click', createReply);