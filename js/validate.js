document.addEventListener('DOMContentLoaded', function() {
    let addSubmit = document.querySelector(".adding-button");
let addname = document.querySelector(".add-name");
let addmail = document.querySelector(".add-mail");
let addphone = document.querySelector(".add-phone");

    const iti = window.intlTelInput(addphone, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io/json', { headers: { 'Accept': 'application/json' } })
                .then(response => response.json())
                .then(data => callback(data.country))
                .catch(() => callback('us'));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });

    function contactExists(name, email, phone) {
        let contacts = JSON.parse(localStorage.getItem('objects')) || [];
        return contacts.some(contact => 
            contact.name === name || contact.mail === email || contact.phone === phone
        );
    }

    if (addSubmit != null) {
        addSubmit.onclick = function () {
            // Validate name
            let regAddname = /^[a-zA-Z]+\s[a-zA-Z]+$/;
            let valueaddname = addname.value.trim();
            let checkname = regAddname.test(valueaddname);

            // Validate email
            let regAddmail = /^\w+@(gmail|outlook)\.(com|net)$/i;
            let valueaddmail = addmail.value.trim();
            let checkmail = regAddmail.test(valueaddmail);

            // Validate phone using intl-tel-input library
            let checkphone = iti.isValidNumber();

            // Get the full international phone number
            let valueaddphone = iti.getNumber();

            // Check all validations
            if (checkname && checkmail && checkphone) {
                if (contactExists(valueaddname, valueaddmail, valueaddphone)) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Contact already exists. Please add a unique contact.',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                } else {
                    let contactsArray = JSON.parse(localStorage.getItem('objects')) || [];
                    let obj = {
                        name: valueaddname,
                        mail: valueaddmail,
                        phone: valueaddphone,
                        num: contactsArray.length // Use the length to avoid sparse arrays
                    };
                    contactsArray.push(obj); // Push new object to array
                    localStorage.setItem("objects", JSON.stringify(contactsArray));
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have added the contact successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // Clear input fields after successful addition
                    addname.value = '';
                    addmail.value = '';
                    iti.setNumber(''); // Clear the phone input
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid email, phone, or name format.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        };
    }
});
