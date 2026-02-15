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
      throw new Error(res.status);
    } else {
      return id;
    }
  });
}

export { getItems, deleteItem };
