const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch items: ${res.status}`);
    } else {
      return res.json();
    }
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to delete item: ${res.status}`);
    } else {
      return id;
    }
  });
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to POST new item: ${res.status}`);
    }
    return res.json();
  });
}

export { getItems, deleteItem, addItem };
