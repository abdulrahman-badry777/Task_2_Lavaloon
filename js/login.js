document.getElementById('login-button').addEventListener('click', function() {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('mail').value;
    const password = document.getElementById('pass').value;

    if (email === 'abdobadry328@gmail.com' && password === '123') {
        Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redirect to contact list page
            window.location.href = 'contact-list.html';
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid email or password.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }
});