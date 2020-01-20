// Send feedback to the server 
export const query = (query) => {
    return fetch(`/api/admin/feedback`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    })

    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// List all users for the admin
export const getUsers = () => {
    return fetch(`/api/users`, {
        method: "GET",
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token}
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 
