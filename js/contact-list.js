// Spinner wait
setTimeout(function() {
    document.getElementById('spinner-container').style.display = 'none';
}, 1000);
// add-button
let addbut = document.querySelector('.add-button');
if(addbut == null) {}
else {
    addbut.onclick = function () {
        window.location.href = 'add-contact.html';
    }
}
//width of contact
let contactdiv = document.querySelector('.contact') ;
let detailsdiv = document.querySelector('.contact-detalis');
if(contactdiv == null) {}
else {
    contactdiv.style.minHeight = `${detailsdiv.offsetHeight+200}px`;
}

// // Adding new contact
//     let addSubmit = document.querySelector(".adding-button");
//     let addname = document.querySelector(".add-name");
//     let addmail = document.querySelector(".add-mail");
//     let addphone = document.querySelector(".add-phone");
// //set local Stroage
// let ArrayofObject = [];
// let ArrayofObjectstr = "";
// let i = 0;
// if(JSON.parse(localStorage.objects).length >0) {
//     i=JSON.parse(localStorage.objects).length;
//     ArrayofObject = JSON.parse(localStorage.objects);
// }
// //remove local stroage
// let box_con = document.querySelector('.box-con');
// //Validate The Input
// if (addSubmit == null) {}
// else {
// addSubmit.onclick =  function () {
// // Validate name
//     let regAddname = /[a-z]+\s([a-z]+$)/i;
//     let valueaddname = addname.value;
//     let checkname = valueaddname.match(regAddname);
// // Validate email
//     let regAddmail = /\w+@(gmail|outlook)\.(com|net)$/i;
//     let valueaddmail = addmail.value;
//     let checkmail = valueaddmail.match(regAddmail);
// // Validate phone
//     let regAddphone = /[0-9]{3}-[0-9]{4}-[0-9]{4}$/i;
//     let valueaddphone = addphone.value;
//     let checkphone = valueaddphone.match(regAddphone);
// //Check all validate are right
//     if(checkname &&checkmail &&checkphone ) {
//         let obj = {
//             name:"",
//             mail:"",
//             phone:"",
//             num: i
//         };
//         obj.name = addname.value;
//         obj.mail = addmail.value;
//         obj.phone = addphone.value;
//         ArrayofObject[i] = obj;
//         i++;
//         ArrayofObjectstr= JSON.stringify(ArrayofObject);
//         window.localStorage.setItem("objects",ArrayofObjectstr);
//         Swal.fire({
//             title: 'Success!',
//             text: 'You have logged in successfully.',
//             icon: 'success',
//             confirmButtonText: 'OK'
//         });
//     }
//     else {
//         Swal.fire({
//             title: 'Error!',
//             text: 'Invalid email or telephone or name.',
//             icon: 'error',
//             confirmButtonText: 'Try Again'
//         });
//     }
// }};
// Put new contacts in contact-list.html
// // gpt5
// Adding new contact
let box_con = document.querySelector('.box-con');
let addSubmit = document.querySelector(".adding-button");
let addname = document.querySelector(".add-name");
let addmail = document.querySelector(".add-mail");
let addphone = document.querySelector(".add-phone");

// Function to check if contact exists
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

        // Validate phone
        let regAddphone = /^\d{3}-\d{4}-\d{4}$/;
        let valueaddphone = addphone.value.trim();
        let checkphone = regAddphone.test(valueaddphone);

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
                addphone.value = '';
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

// 
if( window.location.href === 'http://127.0.0.1:5500/contact-list.html') {
    contactsArray = JSON.parse(localStorage.objects);
            for (let j = 0; j < contactsArray.length; j++) {
                let box_con = document.querySelector(".box-con");
                let newcontact = document.createElement("div");
                let namecontact = document.createElement("div");
                let buttons = document.createElement("div");
                let removebut = document.createElement("button");
                let viewbut = document.createElement("button");
                // let herfviewbut = document.createElement("a");
                //innerhtml
                namecontact.innerHTML = contactsArray[j].name;
                removebut.innerHTML = "Remove";
                viewbut.innerHTML = "view";
                // viewbut.href = "view-contact.html";
                //classlsit
                buttons.classList.add("buttons");
                newcontact.classList.add("box");
                namecontact.classList.add("name");
                removebut.classList.add("remove");
                viewbut.classList.add("view-list");
                //Appendib
                // viewbut.appendChild(herfviewbut);
                buttons.appendChild(removebut);
                buttons.appendChild(viewbut);
                newcontact.appendChild(namecontact);
                newcontact.appendChild(buttons);
                box_con.appendChild(newcontact);
        
    }
    // detailsdiv.parentNode.children
    let contactdiv = document.querySelector('.contact') ;
let detailsdiv = document.querySelector('.contact-detalis');
if(contactdiv == null) {}
else {
    contactdiv.style.minHeight = `${detailsdiv.offsetHeight+200}px`;
}
}
document.addEventListener('click',function (e) {
    if(e.target.classList.contains("remove")){
        let rembox = e.target.parentNode.parentNode;
        for (let j = 2;  j<= box_con.children.length; j++) {
            if(rembox ===box_con.children[j] ) {
                rembox.remove();
                let jj = j;
                let remobj = contactsArray.splice(jj-2,1);
                window.localStorage.setItem("objects",JSON.stringify(contactsArray));        
                return 0;
            }
        }
    }
})
let indexView = 0;
document.addEventListener('click',function (e) {
    if(e.target.classList.contains("view-list")) {
        let rembox = e.target.parentNode.parentNode;
        for (let j = 2;  j<= box_con.children.length; j++) {
            if(rembox ===box_con.children[j] ) {
                indexView = j;
                console.log(indexView);
                window.localStorage.setItem("view_contact",`${indexView}`);
                break;
            }
        }
        window.location.href = 'http://127.0.0.1:5500/view-contact.html'
    }
});
