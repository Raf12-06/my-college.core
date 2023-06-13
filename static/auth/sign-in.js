let usernameInput = document.querySelector('#username');
let passwordInput = document.querySelector('#password');
let submit = document.getElementById('#sbmt');

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
                document.cookie = `Authorization=${response.token}`
            } else {
                const div = document.createElement('div');
                div.innerHTML = `
                <div id="errMsg">
                    <h3>${response.message}</h3>
                <div>
            `;
                document.body.prepend(div);
            }
        });
    }
});
