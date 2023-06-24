const urlParams = new URLSearchParams(window.location.search);
const idStudent = urlParams.get('student_id');

const errModal = document.getElementById('popup');
const closeErrModal = document.getElementById('popup_close')

document.title = 'Студент...';

if (idStudent) {
    fetch(`/student/${idStudent}`).then(async res => {
        const data = await res.json();

        if (res.status === 401) {
            window.location.replace('http://0.0.0.0:8001/auth/sign-in.html?#');
        }
        if (res.ok) {

            document.getElementById('order_info')
                .innerText = `Приказ от ${data.student.order_date} №${data.student.order_num}`

            document.getElementById('fio')
                .innerText = `${data.personal.fio.second_name} ${data.personal.fio.first_name} ${data.personal.fio.third_name}`;

            document.title = `${data.personal.fio.second_name} ${data.personal.fio.first_name} ${data.personal.fio.third_name}`;

            document.getElementById('group_number')
                .innerText = `${data.group.group_name}${data.group.group_year}-${data.group.group_num}${data.group.group_postfix}`;

            document.getElementById('specialization')
                .innerText = data.specialization.name;

            document.getElementById('phone')
                .innerText = data.personal.personal.phone;

            document.getElementById('mail')
                .innerText = data.personal.personal.email;

            document.getElementById('passport')
                .innerText = data.personal.personal.passport;

            document.getElementById('inn')
                .innerText = data.personal.personal.inn;
        } else {
            showError(`${data.message}\n\nstatus:${data.statusCode}`, 'Ошибка!');
        }
    })
}

document.querySelector('.root-nav')
    .addEventListener('click', (event) => {

        if (event.target['nodeName'] !== 'SPAN') return;
        const sibling = event.target['nextElementSibling'];
        closeAllSubMenu(sibling);
        event.target['classList'].add('sub-menu-active');
        sibling.classList.toggle('sub-menu-active');
});

function closeAllSubMenu(curr = null) {
    let parent = [];
    if (curr) {
        let currParent = curr.parentNode;
        while(currParent) {
            if (currParent.classList.contains('root-nav')) break;
            if (currParent.nodeName === 'UL') parent.push(currParent);
            currParent = currParent.parentNode;
        }
    }
    const subMenu = document.querySelectorAll('.root-nav ul');
    Array.from(subMenu).forEach(item => {
        if (item !== curr && !parent.includes(item)) item.classList.remove('sub-menu-active');
        if (item.previousElementSibling.nodeName === 'SPAN') {
            item.previousElementSibling.classList.remove('sub-menu-active');
        }
    });
}

document.querySelector('.root-nav').onmouseleave = closeAllSubMenu;

window.onerror = function(msg, url, lineNo, columnNo, error) {
    showError(`${msg}\n${url}\nline:${lineNo} col:${columnNo}\n${error}`);
}

async function showError(msg, title = 'Простите, ошибка!') {

    await errModal.classList.add('open');

    document.getElementById('popup_title')
        .innerText = title;

    document.getElementById('popup_text')
        .innerText = msg;

    closeErrModal.addEventListener('click', () => {
        errModal.classList.remove('open');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            errModal.classList.remove('open');
        }
    })
}
