window.onload = function () {
    const mssg = document.getElementById('when-loadind-info');
    const dv = document.getElementById('bx-auth');
    const dvMssg = document.getElementById('message-payment');
    // ---------------
    const next = document.getElementById('next');
    const finish = document.getElementById('finish');
    const preview = document.getElementById('preview');
    const hdl1 = document.getElementById('hdl-1');
    const hdl2 = document.getElementById('hdl-2');
    const hdl3 = document.getElementById('hdl-3');
    // ----------------
    const icheck1 = document.getElementById('radioPrimary1');
    const icheck2 = document.getElementById('radioPrimary2');
    // ----------------
    const dvo = document.createElement('div');
    // ----------------
    dvo.className = 'col-lg-12';
    dvo.innerHTML = '<span class="badge badge-info">INFO</span>' +
        '&nbsp;Les paiements en cash se font directement à la comptabilité dans les installations de l\'agence <br>' +
        '<em><span class="badge badge-danger">NOTE</span>&nbsp;' +
        'Ce véhicule reste visible sur le site, aussi longtemps que vous n\'aurai pas finaliser votre processus avec nos services de compta' +
        'bilité; en cas d\'annulation votre compte sera momentanement suspendu pour une durée d\'un moi, vous pourait plus reserve en ligne</em>';
    dvo.id = 'for-cash';
    // ----------------
    const dvb = document.createElement('div');
    // ----------------
    const tbl = document.createElement('table');
    tbl.className = 'w-75 p-2 mt-3';
    // -----------------
    // tr 1
    const tr = document.createElement('tr');
    tr.className = 'border-bottom';
    const td = document.createElement('td');
    const td_ = document.createElement('td');
    td.innerHTML = 'Nom de la BANK';
    td_.className = 'p-2 text-right'
    td_.innerHTML = '<b>TRUST MERCHANT BANK SA</b>';
    tr.appendChild(td);
    tr.appendChild(td_);
    // end tr 1
    // start tr 2
    const tr1 = document.createElement('tr');
    tr1.className = 'border-bottom';
    const td1 = document.createElement('td');
    const td1_ = document.createElement('td');
    td1.innerHTML = 'Swift Code';
    td1_.className = 'p-2 text-right';
    td1_.innerHTML = '<b>TRMSCD3L</b>';
    tr1.appendChild(td1);
    tr1.appendChild(td1_);
    // end tr 2
    //start tr 3
    const tr2 = document.createElement('tr');
    tr2.className = 'border-bottom';
    const td2 = document.createElement('td');
    const td2_ = document.createElement('td');
    td2.innerHTML = 'Bénéficiaire';
    td2_.className = 'p-2 text-right'
    td2_.innerHTML = '<b>Les mille services SARL</b>';
    tr2.appendChild(td2);
    tr2.appendChild(td2_);
    // end tr 3
    //start tr 4
    const tr3 = document.createElement('tr');
    tr3.className = 'border-bottom';
    const td3 = document.createElement('td');
    const td3_ = document.createElement('td');
    td3.innerHTML = 'Numéro du compte';
    td3_.className = 'p-2 text-right';
    td3_.innerHTML = '<b>00017280002347595000119</b>';
    tr3.appendChild(td3);
    tr3.appendChild(td3_);
    //end of tr 4
    // const tr0 = document.createElement('tr');
    // const td2 = document.createElement('td');
    // td2.innerHTML = 'Nom de la <b>BANK</b>';
    // const th2 = document.createElement('th');
    // th2.innerHTML = '<b>TMB</b>&nbsp;TRUST MERCHANT BANK SA';
    // const td1 = document.createElement('td');
    // td1.innerHTML = 'Swift Code';
    // const th1 = document.createElement('th');
    // th1.innerHTML = 'TRMSCD3L';
    // const tr1 = document.createElement('tr');
    // const tr2 = document.createElement('tr');
    // const td3 = document.createElement('td');
    // const th3 = document.createElement('th');
    // th3.innerHTML = 'Numero de compte';
    // th3.innerHTML = '00017280002347595000119';
    // const td4 = document.createElement('td');
    // const th4 = document.createElement('th');
    // th3.innerHTML = 'Nom du béneficaire';
    // th3.innerHTML = 'Les mille services SARL';

    const lnkContainer = document.createElement('div');
    lnkContainer.className = 'col-lg-12 p-2';
    const lnkBiling = document.createElement('a');
    lnkBiling.href = 'https://lesmilleservices.com/bilings/';
    lnkBiling.className = 'nav-link';
    lnkBiling.innerHTML = 'https://lesmilleservices.com/bilings/';
    lnkContainer.innerHTML = 'Déposez le fichié scan à cette adresse :'
    lnkContainer.appendChild(lnkBiling);
    // ----------------
    dvb.className = 'col-lg-12';
    dvb.innerHTML = '<span class="badge badge-info">INFO</span>' +
        '&nbsp;Nos coordonnées bancaire:';
    dvb.id = 'for-bank';
    // ----------------
    // ----------------
    tbl.appendChild(tr);
    tbl.appendChild(tr1);
    tbl.appendChild(tr2);
    tbl.appendChild(tr3);
    dvb.appendChild(tbl);
    // ----------------
    hdl1.disabled = true;
    hdl2.disabled = true;
    hdl3.disabled = true;
    next.disabled = true;
    finish.disable = true;
    // ----------------
    setTimeout(function(){
        if(JSON.parse(localStorage.getItem('lesServicesIdCustomer'))){
            const me = JSON.parse(localStorage.getItem('lesServicesIdCustomer'));
            mssg.innerHTML = 'Nous vérifions les identifiants dans votre appareil ...';
            next.disabled = false;
            setTimeout(function () {
                next.onclick = function(){
                    lastStep();
                    setTimeout(function(){
                        next.disabled = true;
                    }, 0)
                }
                preview.onclick = function(){
                    next.disabled = false;
                }
                mssg.innerHTML = 'Bienvenu encore <b class="text-bold text-warning">' + me.nick1 +'&nbsp;'+me.nick2+'</b>' +
                    '<h3>Authentification réussie</h3>' +
                    '<b class="text-secondary">Veillez appuyer sur suivant</b>';
                // appending
                dv.innerHTML = null;
                icheck1.onclick = function(evt){
                    if (evt.target.checked){
                        dvMssg.innerHTML = null;
                        document.getElementById('when-bank-s').classList.add('d-none');
                        dvMssg.classList.add('border');
                        dvMssg.appendChild(dvo);
                        next.disabled = false;
                    }
                }
                icheck2.onclick = function(evt){
                    if (evt.target.checked){
                        dvMssg.innerHTML = null;
                        document.getElementById('when-bank-s').classList.remove('d-none');
                        dvMssg.classList.add('border');
                        dvMssg.appendChild(dvb);
                        next.disabled = false;
                    }
                }

            }, 200);
        // ============================================ end ============================================= //
        }else{
            const btnLogIn = document.createElement('a');
            btnLogIn.className = 'btn btn-primary';
            btnLogIn.id = 'when-diff-auth';
            btnLogIn.innerHTML = '<span>Connexion</span>';
            mssg.innerHTML = 'Vous n\'ête pas authetifié';
            const btnSigUp = document.createElement('a');
            btnSigUp.className = 'btn btn-primary mb-3';
            btnSigUp.id = 'when-diff-auth-lnk';
            btnSigUp.src = '/register';
            btnSigUp.innerHTML = '<span>Créer un compte</span>';
            btnSigUp.addEventListener('click',()=>{
                window.location.href = '/register';
            },false);
            const formSinEmail = document.createElement('input');
            formSinEmail.type = 'email';
            formSinEmail.className = 'form-control mt-2';
            formSinEmail.name = 'getEmail';
            formSinEmail.id = 'emailHere';
            formSinEmail.placeholder = 'Adresse mail ici'
            const formSinPwd = document.createElement('input');
            formSinPwd.type = 'password';
            formSinPwd.className = 'form-control mt-4';
            formSinPwd.name = 'getPwd';
            formSinPwd.id = 'pwdHere';
            formSinPwd.placeholder = 'Mot de passe';
            const btnSubmition = document.createElement('a');
            btnSubmition.id = 'submit';
            btnSubmition.className = 'btn btn-default mt-2';
            btnSubmition.innerHTML = '<b>' +
                '<span id="ann" class="spinner-grow d-none"></span>' +
                '&nbsp;Connexion' +
                '</b>';
            const onSuccess = function(){
                setTimeout(function(){
                    dv.removeChild(formSinPwd);
                    dv.removeChild(formSinEmail);
                    dv.removeChild(btnSubmition);
                    dv.removeChild(btnSigUp);
                    dv.removeChild(btnLogIn);
                }, 0)
            }
            btnSubmition.onclick = function(){
                if(formSinEmail.value === ''){formSinEmail.classList.add('border-danger')}else{formSinEmail.classList.remove('border-danger')}
                if(formSinPwd.value === ''){formSinEmail.classList.add('border-danger')}else{formSinEmail.classList.remove('border-danger')}
                if (formSinPwd.value !== '' && formSinEmail.value !== ''){
                    document.getElementById('ann').classList.remove('d-none');
                    fetch('/connectingUser', {
                        method: 'post',
                        headers: {'content-type':'application/json'},
                        body: JSON.stringify({email: formSinEmail.value,password:formSinPwd.value})
                    }).then((res)=>{
                        const me = JSON.parse(res.statusText);
                        switch (res.status) {
                            case 200:
                             document.getElementById('ann').classList.add('d-none');
                             localStorage.setItem('lesServicesIdCustomer', JSON.parse(JSON.stringify(res.statusText)));
                             mssg.innerHTML = 'Bienvenu encore <b class="text-bold text-warning">' + me.nick1 +'&nbsp;'+ me.nick2 +'</b>' +
                                 '<h3>Authentification réussie</h3>' +
                                 '<b class="text-secondary">Veillez appuyer sur suivant</b>';
                             onSuccess();  // method appending here
                                next.disabled = false;
                                hdl2.disabled = false;
                                next.onclick = function (evt) {
                                    lastStep();
                                    if(!icheck1.checked || !icheck2.checked){
                                        setTimeout(function () {
                                            evt.target.disabled = true;
                                        }, 300)
                                    }
                                }
                                preview.onclick = function (evt) {
                                    next.disabled = false;
                                }
                                icheck1.onclick = function (evt) {
                                    if (evt.target.checked){
                                        dvMssg.innerHTML = null;
                                        document.getElementById('when-bank-s').classList.add('d-none');
                                        dvMssg.classList.add('border');
                                        dvMssg.appendChild(dvo);
                                        next.disabled = false;
                                    }
                                }
                                icheck2.onclick = function(evt){
                                    if (evt.target.checked){
                                        dvMssg.innerHTML = null;
                                        document.getElementById('when-bank-s').classList.remove('d-none');
                                        dvMssg.classList.add('border');
                                        dvMssg.appendChild(dvb);
                                        dvMssg.appendChild(lnkContainer);
                                        next.disabled = false;
                                    }
                                }
                             break;
                            case 403:
                                mssg.innerHTML = '<b class="text-danger"><span class="fa fa-warning"></span> Mot de pass ou email incorecte</b>';
                                document.getElementById('ann').classList.add('d-none');
                                break;
                            case 500:
                                mssg.innerHTML = '<b class="text-danger"><span class="fa fa-warning"></span> Erreur de connection internet</b>';
                                document.getElementById('ann').classList.add('d-none');
                                break;
                            default:
                                break;
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }
            btnLogIn.addEventListener('click',()=>{
                dv.appendChild(formSinEmail);
                dv.appendChild(formSinPwd);
                dv.appendChild(btnSubmition);

            }, false);
            dv.innerHTML = null;
            dv.appendChild(btnSigUp);
            dv.appendChild(btnLogIn);
        }
    },1500)
    function lastStep() {
        const infoContainer = document.getElementById('detail-cars');
        const imgContent = document.getElementById('detail-img-car');

    }
}
