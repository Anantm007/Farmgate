import BASE_URL from "../../utils/baseUrl";

// Send feedback to the server
export const query = (query) => {
  return fetch(`${BASE_URL}/api/admin/feedback`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Generate invoice for an order
export const generateSpecialInvoice = (orderId) => {
  return fetch(`${BASE_URL}/api/util/specialInvoice/${orderId}`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all users for the admin
export const getUsers = () => {
  return fetch(`${BASE_URL}/api/users`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all shops for the admin
export const listShops = () => {
  return fetch(`${BASE_URL}/api/shops`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all orders for admin
export const listOrders = () => {
  return fetch(`${BASE_URL}/api/order/admin/all`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get status values of all orders
export const getStatusValues = () => {
  return fetch(`${BASE_URL}/api/order/statusValues`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Update status values
export const updateOrderStatus = (orderId, status) => {
  return fetch(`${BASE_URL}/api/order/admin/update/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Generate orders invoice for shops
export const generateInvoice = (id) => {
  return fetch(`${BASE_URL}/api/order/invoice/${id}`, {
    method: "GET",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Create a new Certificate
export const createCertificate = (data) => {
  let formBody = {};
  formBody.name = data.name;
  formBody.url = data.url;
  formBody.shop = data.shop;

  return fetch(`${BASE_URL}/api/admin/certificate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(formBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update a certificate
export const updateCertificate = (id, data) => {
  let formBody = {};
  formBody.name = data.name;
  formBody.url = data.url;

  return fetch(`${BASE_URL}/api/admin/certificate/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(formBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete a certificate
export const deleteCertificate = (id) => {
  return fetch(`${BASE_URL}/api/admin/certificate/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
