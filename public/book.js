const submitEvent = async (e) => {
    e.preventDefault();

    const form = document.getElementById("my-form");
    const formData = new FormData(form);

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);

        // Display success message
        const successMessage = document.getElementById("success-message");
        successMessage.classList.remove("hidden");
        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 2000);

        // Reset form
        form.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error
    }
};

document.getElementById("my-form").onsubmit = submitEvent;
