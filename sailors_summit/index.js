// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Dark mode toggle function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

// Step 3: Add event listener for theme button
themeButton.addEventListener("click", toggleDarkMode);

/*** Form Validation ***/

// Step 1: Get the RSVP button
const rsvpbutton = document.getElementById("rsvp-button");

// Step 2: Count of participants
let count = 3;

// Step 3: validateForm function
const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  const rsvpInputs = document.querySelectorAll("#rsvp-form input, #rsvp-form select");

  let person={
    name:rsvpInputs[0].value,
    hometown:rsvpInputs[1].value,
    email:rsvpInputs[2].value
  }
  // Loop through each input field
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];

    if (input.value.trim().length < 2) {
      containsErrors = true;
      input.classList.add("error"); // Add error class
    } else {
      input.classList.remove("error"); // Remove error class if previously added
    }
  }

  // *** Add email validation here ***
  const emailInput = document.getElementById("email");
  if (!emailInput.value.includes("@") || !emailInput.value.endsWith(".com")) {
    containsErrors = true;
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }

  // If no errors, call addParticipant and clear fields
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person)
    
    // Clear input fields
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
};


// Step 4: addParticipant function
const addParticipant = (person) => {
  const newRSVP = document.createElement("p");
  newRSVP.textContent = `🎉 ${person.name} (${person.email}) from ${person.hometown} has RSVP'd.`;

  const participantsSection = document.querySelector(".rsvp-participants");
  participantsSection.appendChild(newRSVP);

  const existingCount = document.getElementById("rsvp-count");
  if (existingCount) {
    existingCount.remove();
  }

  count += 1;

  const newCount = document.createElement("p");
  newCount.id = "rsvp-count";
  newCount.textContent = "⭐ " + count + " people have RSVP'd to this event!";
  participantsSection.appendChild(newCount);
};

// Step 5: Add the click listener for form submission
rsvpbutton.addEventListener("click", validateForm);

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

// Existing modal and animation logic
const toggleModal = (person) => {
  let modal = document.querySelector('#success-modal');
  modal.style.display = 'flex';

  let modalContent = document.querySelector('#modal-text');
  modalContent.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;

  let intervalId = setInterval(animateImage, 500);

  setTimeout(() => {
    modal.style.display = 'none';
  }, 5000);
};

let rotateFactor = 0;
const modalImage = document.getElementById('modal-image');

const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  } else {
    rotateFactor = 0;
  }

  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

// ✅ Add close button functionality here:
const closeButton = document.getElementById("close-modal-btn");
const modal = document.getElementById("success-modal");

const closeModal = () => {
  modal.style.display = "none";
};

closeButton.addEventListener("click", closeModal);
