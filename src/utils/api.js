const baseUrl = "http://localhost:3001";

function getItems() {
  return request(`${baseUrl}/items`);
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

function addItem(item) {
  return request(`${baseUrl}/items`, {
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
