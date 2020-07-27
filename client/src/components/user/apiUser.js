// Get a particular user
export const getUser = async (id) => {
  return fetch(`/api/users/${id}`, {
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

// Update User
export const Update = async (id, user) => {
  return fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update user in local storage
export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

// Add item to user's cart
export const addToCart = (id) => {
  const b = {
    quantity: 1,
  };

  return fetch(`/api/users/cart/add/${id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(b),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get cart length of user
export const cartLength = () => {
  return fetch(`/api/users/cart/length`, {
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

// Get cart total of user
export const getCartTotal = () => {
  return fetch(`/api/users/cart/total`, {
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

// Update item quantity from cart
export const updateCartItem = (id, quantity) => {
  const b = {
    quantity,
  };
  return fetch(`/api/users/cart/update/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(b),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Remove item from cart
export const removeFromCart = (id, amount) => {
  return fetch(`/api/users/cart/remove/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(amount),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get access code for payment from backend
export const Pay = (data) => {
  return fetch(`/api/eway/payment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// // Get access code for payment from backend
// export const getClientToken = (userId, amount) => {
//     return fetch(`/api/eway/getToken/${userId}`, {
//         method: 'POST',
//         headers: {
//             Accept: "application/json",
//             'Content-Type': "application/json",
//             'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
//         },
//         body: JSON.stringify(amount)
//     })
//     .then(response => {
//         return response.json();
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // Check Payment status
// export const checkPaymentStatus = (userId, code) => {
//     return fetch(`/api/eway/status/${userId}/${code}`, {
//         method: 'GET',
//         headers: {
//           'x-auth-token': JSON.parse(localStorage.getItem('jwt')).token
//         }
//       })
//       .then(response => {
//           return response.json();
//       })
//       .catch(err => {
//           console.log(err);
//       })
// }

// Create the order
export const createOrder = (userId, data) => {
  return fetch(`/api/order/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// List all orders for the user
export const listOrders = (userId) => {
  return fetch(`/api/order/user/${userId}`, {
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

// Check promo code for delivery and tax
export const checkPromo = (data) => {
  return fetch(`/api/order/checkout/checkPromo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("jwt")).token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// // Set delivery info in the localstorage for payment checking
// export const setInfo = (data) => {
//     if(typeof window !== 'undefined')
//     {
//         localStorage.setItem('orderInfo', JSON.stringify(data))
//     }
// }

// // Read delivery info
// export const readInfo = () => {
//     if(typeof window === 'undefined')
//     {
//         return false;
//     }

//     if(localStorage.getItem('orderInfo'))
//     {
//         return JSON.parse(localStorage.getItem('orderInfo'));
//     } else {
//         return false;
//     }
// }

// // Remove order info from localstorage
// export const removeInfo = () => {
//     if(typeof window !== 'undefined')
//     {
//         localStorage.removeItem('orderInfo');
//     }
// }
