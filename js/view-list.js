// Spinner wait
setTimeout(function() {
    document.getElementById('spinner-container').style.display = 'none';
}, 1000);
let editToggle = document.getElementById('editToggle');
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve contact details from localStorage 
    let contacts = JSON.parse(localStorage.getItem('objects')) || [];
    let contactId = ( parseInt(localStorage.getItem('view_contact'))-2 );
        
    if (contactId !== null && contacts[contactId]) {
        let contact = contacts[contactId];
        // Display contact details on the page
        document.getElementById('contactName').textContent = contact.name;
        document.getElementById('contactEmail').textContent = contact.mail;
        document.getElementById('contactPhone').textContent = contact.phone;
    } else {
        console.log('Contact not found or invalid contactId:', contactId);
    }

    // Toggle edit mode
    // let editToggle = document.getElementById('editToggle');
    let editTogglespan = document.querySelector('.circle');
    let saveButton = document.getElementById('saveButton');
    // come from update
    if(window.localStorage.getItem("updated") === 'true') {
            editToggle.classList.toggle("clicked");
            editTogglespan.classList.toggle("move");
            window.localStorage.setItem("updated","false");
            if (editToggle.classList.contains("clicked")) {
                // Enable editing: Show save button
                saveButton.style.display = 'block';
                // Example: Enable input fields for editing
                document.getElementById('contactName').setAttribute('contenteditable', true);
                document.getElementById('contactEmail').setAttribute('contenteditable', true);
                document.getElementById('contactPhone').setAttribute('contenteditable', true);
            } else {
                // Disable editing: Hide save button
                saveButton.style.display = 'none';
                // Example: Disable input fields
                document.getElementById('contactName').setAttribute('contenteditable', false);
                document.getElementById('contactEmail').setAttribute('contenteditable', false);
                document.getElementById('contactPhone').setAttribute('contenteditable', false);
            }
    }
    
    editToggle.addEventListener('click', function() {
        editToggle.classList.toggle("clicked");
        editTogglespan.classList.toggle("move");
        if (editToggle.classList.contains("clicked")) {
            // Enable editing: Show save button
            saveButton.style.display = 'block';
            // Example: Enable input fields for editing
            document.getElementById('contactName').setAttribute('contenteditable', true);
            document.getElementById('contactEmail').setAttribute('contenteditable', true);
            document.getElementById('contactPhone').setAttribute('contenteditable', true);
        } else {
            // Disable editing: Hide save button
            saveButton.style.display = 'none';
            // Example: Disable input fields
            document.getElementById('contactName').setAttribute('contenteditable', false);
            document.getElementById('contactEmail').setAttribute('contenteditable', false);
            document.getElementById('contactPhone').setAttribute('contenteditable', false);
        }
    });
    //Save button
    saveButton.addEventListener('click', function() {
    
        // Save edited contact details to localStorage or server/API
        let updatedContact = {
            name: document.getElementById('contactName').textContent,
            mail: document.getElementById('contactEmail').textContent,
            phone: document.getElementById('contactPhone').textContent
        };
        // Update the contacts array (replace the contact at contactId)
        if (contactId !== null && contacts[contactId]) {
            //check if it is in the database 
            function contactExists(name, email, phone) {
                let contacts = JSON.parse(localStorage.getItem('objects')) || [];
                return contacts.some(contact => 
                    contact.name === name || contact.mail === email || contact.phone === phone
                );
            }            
            // Check Exit in data base
            let regAddname = /^[a-zA-Z]+\s[a-zA-Z]+$/;
            let valueaddname = updatedContact.name;
            let checkname = regAddname.test(valueaddname);
    
            // Validate email
            let regAddmail = /^\w+@(gmail|outlook)\.(com|net)$/i;
            let valueaddmail = updatedContact.mail;
            let checkmail = regAddmail.test(valueaddmail);
    
            // Validate phone
            let regAddphone = /^.\d{1,3}\d{3}\d{4}\d{4}$/;
            let valueaddphone = updatedContact.phone;
            let checkphone = regAddphone.test(valueaddphone);
            if (checkname && checkmail && checkphone) {
                if (contactExists(updatedContact.name, updatedContact.mail, valueaddphone)) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Contact already exists. Please add a unique contact.',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                }
                else {
                    contacts[contactId] = updatedContact;
                    localStorage.setItem('objects', JSON.stringify(contacts));
                // Show SweetAlert2 confirmation message
                Swal.fire({
                    title: 'Changes Saved!',
                    text: 'Your changes have been saved successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                }
            }   
            else {
                console.log(checkname , checkmail , checkphone);
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalied Input',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } else {
            alert('Contact not found or invalid operation!');
        }
    });
});


