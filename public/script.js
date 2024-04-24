// Function to fetch comments from the server
const fetchComments = async () => {
    try {
        const response = await fetch("/api/comments");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};

// Define the displayComments function after the fetchComments function
const displayComments = (comments) => {
    const reviewsSection = document.querySelector('.reviews');
    reviewsSection.innerHTML = ''; // Clear existing reviews
    
    comments.forEach(comment => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="reviewer-info">
                <h3>${comment.firstName} ${comment.lastName}</h3>
                <p>${comment.email}</p>
            </div>
            <div class="review-content">
                <p>${comment.message}</p>
            </div>
        `;
        reviewsSection.appendChild(reviewDiv);
    });
};

// Call the displayComments function when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    await displayComments();
});


// Now, define the rest of your script
document.addEventListener("DOMContentLoaded", function() {
    const addCommentButton = document.getElementById("add-comment-button");
    const commentForm = document.getElementById("comment-form");

    addCommentButton.addEventListener("click", function() {
        commentForm.style.display = "block";
    });

    // Event listener for form submission
    const addCommentForm = document.getElementById("add-comment-form");
    addCommentForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const name = document.getElementById("comment-name").value;
        const email = document.getElementById("comment-email").value;
        const message = document.getElementById("comment-message").value;
        
        // Here, you can make a fetch request to your server to submit the comment
        
        // After successful submission, you can add the comment to the page dynamically
        const reviewsSection = document.querySelector(".reviews");
        const newCommentHTML = `
            <div class="review">
                <div class="reviewer-info">
                    <h3>${name}</h3>
                    <p>${email}</p>
                </div>
                <div class="review-content">
                    <p>${message}</p>
                </div>
            </div>
        `;
        reviewsSection.insertAdjacentHTML("beforeend", newCommentHTML);

        // Reset the form after submission
        addCommentForm.reset();
        commentForm.style.display = "none";
    });
});

// Call the fetchComments function when the page loads to display existing comments
window.addEventListener("load", async () => {
    const comments = await fetchComments();
    displayComments(comments);
});

// Add event listener for form submission
document.getElementById("add-comment-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const name = document.getElementById("comment-name").value;
    const email = document.getElementById("comment-email").value;
    const message = document.getElementById("comment-message").value;
    const response = await fetch("http://localhost:3000/api/comments", { // Update the URL to your local server
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName: name, lastName: "", email, message })
    });
    if (response.ok) {
        alert("Comment submitted successfully!");
        document.getElementById("add-comment-form").reset();
        const comments = await fetchComments(); // Fetch comments again after submission
        displayComments(comments); // Display updated comments
    } else {
        alert("Failed to submit comment.");
    }
});







