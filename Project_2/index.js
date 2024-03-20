// Function to fetch and display a list of pets
function listPets(){
    // Send a GET request to the server to fetch a list of pets available for adoption
    fetch('http://localhost:8000')
        .then(response => response.json())
        .then(data => {
            const petsList = document.getElementById('petsList');
            petsList.innerHTML = '';
            data.forEach(petName => {
                const listItem = document.createElement('li');
                listItem.textContent = petName;
                listItem.onclick = (event) => getPetDetails(event, petName);
                petsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching pets: ', error);
        });
}

// Function to fetch and display pet details
function getPetDetails(event, name) {
    console.log('Clicked pet name:', name);
    fetch(`http://localhost:8000/${name}`)
        .then(response => response.json())
        .then(data => {
            const petDetails = document.getElementById('petDetails');
            petDetails.innerHTML = `
                <p>Name: ${name}</p>
                <p>Species: ${data.species}</p>
                <p>Breed: ${data.breed}</p>
                <p>Age: ${data.age}</p>
            `;
            const petsList = document.getElementById('petsList');
            const petItems = petsList.getElementsByTagName('li');
            for (let i = 0; i < petItems.length; i++) {
                petItems[i].classList.remove('selected');
            }
            console.log('Setting selected class on:', event.target);
            event.target.classList.add('selected');
        })
        .catch(error => {
            console.error('Error fetching pet details: ', error);
        });
}

// Function to adopt a pet
// Function to adopt a pet
function adoptPet() {
    const selectedPet = document.querySelector('#petsList li.selected');
    if (!selectedPet) {
        alert('Please select a pet to adopt.');
        return;
    }
    const petName = selectedPet.textContent;
    fetch(`http://localhost:8000/${petName}`, { method: 'DELETE' })
        .then(() => {
            selectedPet.remove();
            document.getElementById('petDetails').innerHTML = '';
        })
        .catch(error => {
            console.error('Error adopting pet: ', error);
        });
}

function updateDetails() {
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        
        const selectedPet = document.querySelector('#petsList li.selected');
        if (!selectedPet) {
            alert('Please select a pet to update details.');
            return;
        }
        const petName = selectedPet.textContent;
    
        const species = document.getElementById('species').value;
        const breed = document.getElementById('breed').value;
        const age = document.getElementById('age').value;
    
        const updatedDetails = { species, breed, age };
    
        fetch(`http://localhost:8000/${petName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDetails)
        })
        .then(response => {
            if (response.ok) {
                alert('Details updated successfully.');
                // Optionally, refresh the list of pets to reflect changes
                listPets();
            } else {
                throw new Error('Failed to update details.');
            }
        })
        .catch(error => {
            console.error('Error updating pet details: ', error);
        });
    });
}

// Function to handle form submission for adding a new pet
function handleAddPetFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const form = event.target;
    const formData = new FormData(form);

    const newPetDetails = {
        name: formData.get('name'),
        species: formData.get('species'),
        breed: formData.get('breed'),
        age: parseInt(formData.get('age'))
    };

    addPet(newPetDetails);
}

// Function to add a new pet
function addPet(details) {
    fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    })
    .then(response => {
        if (response.ok) {
            alert('Pet added successfully.');
            // Optionally, refresh the list of pets to reflect changes
            listPets();
        } else {
            throw new Error('Failed to add pet.');
        }
    })
    .catch(error => {
        console.error('Error adding pet: ', error);
    });
}

// Add event listener to the form for form submission
const addPetForm = document.getElementById('addPetForm');
addPetForm.addEventListener('submit', handleAddPetFormSubmit);

// Initial function call to list pets
listPets();