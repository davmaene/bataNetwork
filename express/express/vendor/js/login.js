
const email = document.getElementById('cnnx-email');
const password = document.getElementById('cnnx-pwd');
const showUp = document.getElementById('showup');
const error = document.getElementById('dng');
const anim = document.getElementById('animOnConnection');
showUp.addEventListener('click',(e) => {
    if (password.type === 'text'){
        showUp.classList.add('fa-eye-slash');
        password.type = 'password';
    } else {
        showUp.classList.remove('fa-eye-slash');
        password.type = 'text';
    }
});
document.getElementById('cnnx-btn').addEventListener('click', function () {
    if (email.value === ''){
        email.classList.add('border-danger');
    }else {
        email.classList.remove('border-danger');
    }
    if (password.value === ''){
        password.classList.add('border-danger');
    }else {
        password.classList.remove('border-danger');
    }
    if (email.value !== '' && password.value !== ''){
        anim.classList.remove('d-none');
        fetch('/connectingUser',{
            method: 'post',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({email:email.value, password: password.value})
        }).then(function(successR){
            console.log(successR.statusText);
            switch (successR.status) {
                case 200:
                    error.classList.add('d-none');
                    anim.classList.add('d-none');
                    const adm = JSON.parse(successR.statusText);
                    localStorage.setItem('lesServicesIdCustomer', JSON.stringify({nick1:adm.nick1,nick2:adm.nick2,id:adm.id}))
                    window.location.reload();
                    break;
                case 403:
                    anim.classList.add('d-none');
                    error.classList.remove('d-none');
                    break;
                case 408:
                    anim.classList.add('d-none');
                    error.classList.remove('d-none');
                    error.innerHTML = '<div class="alert alert-default-danger text-sm">' +
                        '<span class="text-indigo">Erreur de connexion</span><br>'+
                        'delais de connexion depassé vous devez vérifier votre connection internet merci <br> davidmened@gmail.com => admin' +
                        '</div>'
                    // alert('delais depasser vous devez vérifier votre connection internet merci\ndavidmened@gmail.com => admin')
                    // error.classList.remove('d-none');
                    break;
                default :
                    break;
            }
        }).catch(function (error) {
            anim.classList.add('d-none');
            console.log(error);
        })
    }
});
