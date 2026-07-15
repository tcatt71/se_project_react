import { BASE_URL } from "./constants";

function getItems() {
  return request(`${BASE_URL}/items`);
}

function deleteItem(id) {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
}

function addItem(item) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
