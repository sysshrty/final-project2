const displayContact = (e) => {
    e.preventDefault();
    const contact = document.getElementById("contact");
    const overlay = document.getElementById("overlay");
    contact.style.display = "block";
    overlay.style.display = "block";
};

const closeContactForm = () => {
    const contact = document.getElementById("contact");
    const overlay = document.getElementById("overlay");
    contact.style.display = "none";
    overlay.style.display = "none";
};

const displayEmailResult = async (e) => {
    e.preventDefault();
    const result = document.getElementById("contact-result");
    let response = await fetchEmailResult();
    if (response.status == 200) {
        result.innerHTML = "Email Successfully Sent";
    } else {
        result.innerHTML = "Sorry, your email was not sent.";
    }
};

const fetchEmailResult = async () => {
    const form = document.getElementById("contact-form");
    const formData = new FormData(form);
    const clientInfo = await getClientInfo(); // Function to get client information
    formData.append('clientInfo', JSON.stringify(clientInfo)); // Append client information to form data
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.getElementById("contact-result");
    result.innerHTML = "Please wait...";
    try {
        const response = await fetch("/submit-contact-form", { // Change URL to your server endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        });
        return response;
    } catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "Sorry your email couldn't be sent";
    }
};

const getClientInfo = async () => {
    return {
        ipAddress: '127.0.0.1', // et client IP
        userAgent: navigator.userAgent, // User agent string
        timestamp: new Date().toISOString() // Current timestamp
        // Add more client 
    };
};
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

// Function to display comments on the page
const displayComments = async () => {
    const commentsContainer = document.getElementById("comments-container");
    const comments = await fetchComments();
    if (comments.length > 0) {
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
                <p>Name: ${comment.firstName} ${comment.lastName}</p>
                <p>Email: ${comment.email}</p>
                <p>Message: ${comment.message}</p>
                <p>Date: ${new Date(comment.date).toLocaleString()}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    } else {
        commentsContainer.innerHTML = "No comments found.";
    }
};

// Call the displayComments function when the page loads
window.addEventListener("load", displayComments);


document.getElementById("contact-form").onsubmit = displayEmailResult;
document.getElementById("open-contact").onclick = displayContact;
document.getElementById("close-contact").onclick = closeContactForm;






