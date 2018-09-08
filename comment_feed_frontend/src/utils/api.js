import * as env from './env'


const serverUrl = `http://localhost:3001`;
//delete comment by Id
export const deleteComment = (commentId) => {
    let searchUrl = `/comments/${commentId}`;
    let token = localStorage.getItem('token') || Math.random();

    const url = `${serverUrl}${searchUrl}`;

    const headers = {
        'Authorization': token
    };

    const data = {
        headers : {...headers},
        method: 'DELETE'
    };

    return fetch(url, data).then((res) => {
        return res.json()
    }).then((data) => {
        console.log('data', data);
        return data;
    });
};

//Get all the comments
export const getComments = () => {
    let searchUrl = `/comments`;
    let token = Math.random();

    const url = `${serverUrl}${searchUrl}`;

    const headers = {
        'Authorization': token
    };

    const data = {
        headers : {...headers},
        method: 'GET'
    };

    return fetch(url, data).then((res) => {
        debugger;
        return res.json()
    }).then((data) => {
        console.log('data', data);
        debugger;
        return data;
    });
};

//Get the details for a single comment
export const getDetailsForComment = (commentId) => {
    let searchUrl = `/comments/${commentId}`;
    let token = Math.random();

    const url = `${serverUrl}${searchUrl}`;

    const headers = {
        'Authorization': token
    };

    const data = {
        headers : {...headers},
        method: 'GET'
    };

    return fetch(url, data).then((res) => {
        return res.json()
    }).then((data) => {
        console.log('data', data);
        return data.comments
    });
};

//Add a comment to a post
export const addComment = (params) => {
    let searchUrl = `/comments`;
    let token = Math.random();

    const url = `${serverUrl}${searchUrl}`;

    const headers = {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json'
    }

    const body = {
        timestamp: params.timestamp,
        message: params.message,
        email: params.email
    }

    const data = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
    }

    return fetch(url, data).then((res) => {
        return res.json();
    }).then((data) => {
        console.log('data', data);
        return data;
    });
};

//Edit the details of an existing comment
export const editExistingComment = (commentId, params) => {
    let searchUrl = `/comments/${commentId}`;
    let token = localStorage.getItem('token') || Math.random() + 'zoe';

    const url = `${serverUrl}${searchUrl}`;

    const headers = {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json'
    }

    const body = {
        timestamp: params.timestamp,
        body: params.body
    }

    const data = {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify(body)
    }

    return fetch(url, data).then((res) => {
        return res.json()
    }).then((data) => {
        console.log('data', data);
        return data;
    });
};