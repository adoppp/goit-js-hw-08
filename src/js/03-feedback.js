import throttle from 'lodash.throttle';

const formEl = document.querySelector('form');
const messageEl = document.querySelector('textarea');
const emailEl = document.querySelector('input');

formEl.addEventListener('input', throttle(onFormInput, 500) );
formEl.addEventListener('submit', onFormSubmit );
populateTextarea();

function onFormSubmit (event) {
    event.preventDefault();
    event.currentTarget.reset();
   
    const objectValue = localStorage.getItem("feedback-form-state");
    if (objectValue) {
        console.log(JSON.parse(objectValue));
    } else {
        console.log("No feedback");
    }
     localStorage.removeItem("feedback-form-state");
}

function onFormInput(event) {   
    const valueEmail = emailEl.value;     
    const valueMessage = messageEl.value;
   
     const feedbackState = {
         email: valueEmail,
         message: valueMessage
    } 
    localStorage.setItem("feedback-form-state", JSON.stringify(feedbackState));
     
}
         
function populateTextarea() {
    const savedMessage = localStorage.getItem("feedback-form-state");
    if (savedMessage) {
        const { email, message } = JSON.parse(savedMessage);
        messageEl.value = message;
        emailEl.value = email;
    } 
}
