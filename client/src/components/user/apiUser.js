// Get a particular user
export const getUser = async(id) => {
    return fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}


// Update User
export const Update = async(id, user) => {
       
    return fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
        },
            body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Update user in local storage
export const updateUser = (user, next) => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user.data = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}
