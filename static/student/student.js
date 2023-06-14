const urlParams = new URLSearchParams(window.location.search);
const idStudent = urlParams.get('student_id');

if (idStudent) {
    fetch(`/student/${idStudent}`).then(res => {
        // if (res.status === 401) {
        //     window.location.replace('http://0.0.0.0:8001/auth/sign-in.html');
        // }
        if (res.ok) {

        } else {
            const div = document.createElement('div');
            div.innerHTML = `
                <div id="errMsg">
                    <h3>Ошибка: ${res.statusText ?? res.message}</h3>
                <div>
            `;
            document.body.prepend(div);
        }
    });
}

