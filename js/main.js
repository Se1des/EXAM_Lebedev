const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".posts-list");
const numElementsInput = document.querySelector("#num-elements");

fetchUsersBtn.addEventListener("click", () => {
    const numElements = numElementsInput.value;
    if (!numElements || numElements <= 0) {
        alert("Please enter a valid number of elements to fetch.");
        return;
    }
    fetchUsers(numElements)
        .then((posts) => renderUsers(posts))
        .catch((error) => console.log(error));
});

function fetchUsers(limit) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
    );
}

function renderUsers(posts) {
    userList.innerHTML = ""; // Clear existing content
    const markup = posts
        .map((post) => {
            return `<li>
          <p><b>User ID</b>: ${post.userId}</p>
          <p><b>Post ID</b>: ${post.id}</p>
          <p><b>Title</b>: ${post.title}</p>
          <p><b>Body</b>: ${post.body}</p>
        </li>`;
        })
        .join("");
    userList.insertAdjacentHTML("beforeend", markup);
}
