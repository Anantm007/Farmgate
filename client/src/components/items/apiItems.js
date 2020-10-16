import BASE_URL from "../../utils/baseUrl";

// Add new Item
export const createItem = async (shop) => {
  return fetch(`${BASE_URL}/api/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("shopjwt")).token,
    },
    body: shop,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete an Item
export const deleteItem = async (id) => {
  return fetch(`${BASE_URL}/api/items/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("shopjwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get a particular item
export const getItem = async (id) => {
  return fetch(`${BASE_URL}/api/items/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update an Item
export const Update = async (itemid, item) => {
  if (JSON.parse(localStorage.getItem("shopjwt"))) {
    return fetch(`${BASE_URL}/api/items/${itemid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("shopjwt")).token,
      },
      body: item,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (JSON.parse(localStorage.getItem("jwt"))) {
    return fetch(`${BASE_URL}/api/admin/items/${itemid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
      },
      body: item,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
