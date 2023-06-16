const submitBtn = document.querySelector('.btn');
const inputLogin = document.getElementById('inputLogin');
const inputPass = document.getElementById('inputPass');

submitBtn.addEventListener('click', () => {
    if (inputLogin.value && inputPass.value) {
        fetch('/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                username: inputLogin.value,
                password: inputPass.value,
            })
        }).then(async res => {
            if (res.ok) {
                let data = await res.json();
                document.cookie = `authorization=${data.token}; path=/;`
            } else {
                inputLogin.value = '';
                inputPass.value = '';

                const errModal = document.getElementById('popup');
                errModal.classList.add('open');

                const closeErrModal = document.getElementById('popup_close')
                closeErrModal.addEventListener('click', () => {
                    errModal.classList.remove('open');
                });

                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        errModal.classList.remove('open');
                    }
                })
            }
        })
    }
})

