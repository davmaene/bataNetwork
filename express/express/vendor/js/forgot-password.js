const email = document.getElementById('mailRecover');
const btn = document.getElementById('recover')
const outMssg = document.getElementById('outmessg');
const pin = document.getElementById('pinRecover');
const containerEmail = document.getElementById('canHide');
const containerPin = document.getElementById('receiverPin');

btn.addEventListener('click', function () {
    if (/^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/.test(email.value)){
        email.classList.remove('border-danger');
        containerEmail.classList.add('d-none');
        containerPin.classList.remove('d-none');
        outMssg.innerHTML = 'Nous venons de ' +
            'vous envoyer un mail contenant un ' +
            'code <b>PIN</b>,à l\'adresse <br>' +
            '<span class="badge border bg-olive w-100 p-2">'+ email.value +'</span><br>' +
            ' copier ce code et coller le ici<br><b>Merci</b>'
    }else {
        email.classList.add('border-danger');
    }
}, false)
