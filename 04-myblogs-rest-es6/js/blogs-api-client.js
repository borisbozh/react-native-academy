const API_BASE_URL = "http://localhost:3000/api/posts";

export async function getAllPosts() {
    try {
        const postsResp = await fetch(API_BASE_URL);
        if(postsResp.status >= 400) {
            return Promise.reject(postsResp.body);
        }
        return postsResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}

export async function addNewPost(post) {
    try {
        const postsResp = await fetch(API_BASE_URL, {
            method: `POST`,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if(postsResp.status >= 400) {
            return Promise.reject(postsResp.body);
        }
        return postsResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}

export async function deletePost(postId){
    await fetch('http://localhost:3000/api/posts/' + postId, {
    method: 'DELETE',
})
    document.getElementById(postId).remove();
}

export async function editPost(post, postId){
    await fetch('http://localhost:3000/api/posts/' + postId, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
        'Content-type': 'application/json'
      },
    })
}
