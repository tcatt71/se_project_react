import { BASE_URL } from "./constants";

function getItems(token) {
  return request(`${BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteItem(id, token) {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function addItem(item, token) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

function request(url, options) {
  return fetch(url, options).then(processResponse);
}

function processResponse(res) {
  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export { getItems, deleteItem, addItem, request };
