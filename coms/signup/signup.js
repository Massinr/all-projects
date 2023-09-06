const button = document.querySelector('.login');
button.addEventListener('click', (e) => {
  e.preventDefault();
  const firstName = document.querySelector('.fname').value;
  const lastName = document.querySelector('.lname').value;
  const email = document.querySelector('.email').value;
  const age = document.querySelector('.age').value;
  const password1 = document.querySelector('.password1').value;
  const password2 = document.querySelector('.password2').value;

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    age: age,
    password: password1
  };

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Client data saved successfully!');
    } else {
      throw new Error('Failed to save client data.');
    }
  })
  .catch(error => {
    console.error(error);
  });
});
