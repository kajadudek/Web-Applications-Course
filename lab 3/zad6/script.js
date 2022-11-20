var formData = new FormData(document.getElementById('form'));

function isValid(){
    return document.getElementById("name").checkValidity() && document.getElementById("phone").checkValidity();
}

document.getElementById("add").onclick = function(){

    var formData = new FormData(document.querySelector('form'))
        
    var name = formData.get("name");
    var phone = formData.get("phone");
    phone = phone.replace(/\s/g,'');

    if (phone.charAt(0) == "+"){
        phone = phone.slice(1,phone.length-1);
        phoneArr = phone.match(/.{3}/g);
        phone = "+";
        phoneArr.forEach(element => {
            phone += element + " ";
        });
    }
    else{
        phoneArr = phone.match(/.{3}/g);
        phone = "";
        phoneArr.forEach(element => {
            phone += element + " ";
        });
    }
    

    if (isValid() && name != '' && phone != ''){
        console.log(name,' ',phone);

        var contact = document.createElement('div');
        contact.classList.add('contact-container');

        var contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = "🗑️";
        deleteButton.onclick = function() {
            deleteContact(this);
        }

        var nameElement = document.createElement('p');
        nameElement.textContent = name;
        nameElement.classList.add('contact-name');
        var phoneElement = document.createElement('p')
        phoneElement.textContent = phone;

        contactInfo.append(nameElement,phoneElement);
        contact.append(contactInfo,deleteButton);

        document.getElementById("phonebook").appendChild(contact);

        console.log(contact);
    }
    return false;
}

function deleteContact(el){
    el.parentNode.remove();
}