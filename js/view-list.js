// Spinner wait
setTimeout(function() {
    document.getElementById('spinner-container').style.display = 'none';
}, 1000);
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
    let editToggle = document.getElementById('editToggle');
    let saveButton = document.getElementById('saveButton');
    
    editToggle.addEventListener('change', function() {
        if (editToggle.checked) {
            // Enable editing: Show save button
            saveButton.style.display = 'flex';
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

    saveButton.addEventListener('click', function() {
        // Save edited contact details to localStorage or server/API
        let updatedContact = {
            name: document.getElementById('contactName').textContent,
            mail: document.getElementById('contactEmail').textContent,
            phone: document.getElementById('contactPhone').textContent
        };

        // Update the contacts array (replace the contact at contactId)
        if (contactId !== null && contacts[contactId]) {
            contacts[contactId] = updatedContact;
            localStorage.setItem('objects', JSON.stringify(contacts));
            
            // Show SweetAlert2 confirmation message
            Swal.fire({
                title: 'Changes Saved!',
                text: 'Your changes have been saved successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            alert('Contact not found or invalid operation!');
        }
    });
});


