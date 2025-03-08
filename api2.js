async function getPosts() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();
        console.log(data);  // Debugging: Shows fetched posts in console
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
getPosts();

function changeContent() {
    const API_URL = "https://jsonplaceholder.typicode.com/posts"; 
    const userButtonsContainer = document.getElementById("user-buttons");
    const content = document.getElementById("content");

    // Prevent duplicate buttons
    if (userButtonsContainer.children.length === 0) {
        for (let i = 1; i <= 10; i++) {
            let button = document.createElement("button");
            button.innerText = `User ${i}`;
            button.classList = "tab-btn bg-gray-300 px-4 py-2 rounded-md";
            button.addEventListener("click", () => loadUserPosts(i));
            userButtonsContainer.appendChild(button);
        }
    }

    async function loadUserPosts(userId) {
        try {
            content.innerHTML = `<p class="text-gray-500">Loading posts for User ${userId}...</p>`;

            const response = await fetch(`${API_URL}?userId=${userId}`);
            const posts = await response.json();

            let newContent = `<h3 class="text-xl font-semibold">📖 Posts by User ${userId}</h3>`;

            posts.forEach(post => {
                newContent += `
                    <div class="bg-gray-200 p-4 rounded-md my-2">
                        <h4 class="font-bold">${post.title}</h4>
                        <p>${post.body}</p>
                    </div>
                `;
            });

            content.innerHTML = newContent;

            // Highlight active button
            document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("bg-blue-500", "text-white"));
            document.querySelector(`button:nth-child(${userId})`).classList.add("bg-blue-500", "text-white");

        } catch (error) {
            content.innerHTML = `<p class="text-red-500">Error loading posts.</p>`;
        }
    }
}

changeContent();