let usernameInput = document.querySelector('#username');
let passwordInput = document.querySelector('#password');
let submit = document.getElementById('#submit');

submit.addEventListener('click', () => {
    if (usernameInput.value && passwordInput.value) {
        fetch(`/auth/sign-in`, {
            method: 'POST',
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async res => {
            const response = await res.json();
            if (res.ok) {
                document.cookie = `authorization=${response.token}; path=/`
            } else {
                usernameInput.value = '';
                passwordInput.value = '';

                usernameInput.setAttribute('style', 'border: 1px solid red;');
                passwordInput.setAttribute('style', 'border: 1px solid red;');
            }
        });
    }
});
