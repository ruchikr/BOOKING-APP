document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("userForm").addEventListener("submit", handleFormSubmit);
  fetchAndDisplayUsers();
});

function handleFormSubmit(event) {
  event.preventDefault();
  
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  axios
    .post("https://crudcrud.com/api/f8e9852d0f344cb9a386ff40feef013d/appointmentdata", userDetails)
    .then((response) => {
      displayUserOnScreen(response.data);
      clearInputFields();
    })
    .catch((error) => console.log(error));
}

function clearInputFields() {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;
  userItem.id = userDetails._id; // Assigning an id to the list item for easier deletion

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => handleDelete(userItem, userDetails._id));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => handleEdit(userItem, userDetails));
  userItem.appendChild(editBtn);

  document.querySelector("ul").appendChild(userItem);
}

function handleDelete(userItem, id) {
  axios
    .delete("https://crudcrud.com/api/f8e9852d0f344cb9a386ff40feef013d/appointmentdata/666d59bc19f3e403e81e31e6")
    .then(() => {
      userItem.remove();
    })
    .catch((error) => console.log(error));
}

function handleEdit(userItem, userDetails) {
  // Populate input fields with user details
  document.getElementById("username").value = userDetails.username;
  document.getElementById("email").value = userDetails.email;
  document.getElementById("phone").value = userDetails.phone;

  // Delete the user from crudcrud
  handleDelete(userItem, userDetails._id);
}

function fetchAndDisplayUsers() {
  axios
    .get("https://crudcrud.com/api/f8e9852d0f344cb9a386ff40feef013d/appointmentdata")
    .then((response) => {
      response.data.forEach((user) => displayUserOnScreen(user));
    })
    .catch((error) => console.log(error));
}
