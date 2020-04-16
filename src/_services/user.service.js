import { authHeader, global } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${global.url}/login/authenticate/`, requestOptions)
        .then(handleResponse => {

            if(handleResponse.status === 200){
                console.log("SUCCESSS");
                return handleResponse.json();     
            }else if(handleResponse.status === 404){
                console.log(handleResponse.status);
                return handleResponse.status;
            }else if(handleResponse.status === 408){
                console.log("SOMETHING WENT WRONG");
                return handleResponse.status;
            }        
        })
        .then(user => {
            // login successful if there's a user in the response
            if (user.length) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                return user;

            }else {
                return handleResponse.status;
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    //modification importante pour avoir les datas. Du coup, ajout deuxième callback du fetch et call la function...
    return fetch(`${global.url}/login/`, requestOptions).then(response => response.json()).then(data => handleResponse(data));
}

function handleResponse(response) {
    const datas = response;

    if (!datas) {
            logout();
            window.location.reload(true);
            return Promise.reject('error');
        }

        return datas;
}