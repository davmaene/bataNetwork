class Session {
    expires;
    getExpires(){return this.expires}
    // getUsIdent(){return this.usIdent}
    setExpires(expires){this.expires = expires}
    // setUsIdent(us){this.usIdent = us}
    constructor(){
        // this.exires = exp;
        // this.us = us;
    }
}
// alert(1)
    window.addEventListener('load',() => {
        const ssio = document.getElementById('sec-profile');
        if (!JSON.parse(localStorage.getItem('lesServicesIdCustomer'))){
            const link = document.createElement('a');
                link.href = '/login';
                link.className = 'nav-link txt-drk';
                link.innerHTML = 'Connexion | Enregistrement';
                ssio.appendChild(link);
        // <a href="/profile" class="nav-link txt-drk alr-img">dm</a>
        //     ssio.innerHTML = '<a href="/login" class="nav-link txt-drk">Connexion</a>';
            // window.location.href = 'dashboard/login';
        }else{
            const session = new Session();
            session.setExpires(JSON.parse(localStorage.getItem('lesServicesIdCustomer')));
            const on = session.getExpires();
            const nck1 = on.nick1;
            const nck2 = on.nick2;
            const lk = document.createElement('a');
                lk.href = '#';
                lk.className = 'nav-link txt-drk alr-img';
                lk.id = 'init';
                lk.innerHTML = nck1.substring(0, 1) + '' + nck2.substring(0, 1);
                ssio.appendChild(lk);
            // ssio.innerHTML = '<a href="" class="nav-link txt-drk alr-img" id="init"></a>';
            // document.getElementById('init').innerHTML = '';
            const div = document.createElement('div');
            div.className = 'col-lg-6'
            lk.addEventListener('click', () =>{
               const divs = document.getElementById('dropdown-session');
               if (divs.style.display === 'block'){
                   divs.style.display = 'none';
               }else{
                   divs.style.display = 'block';
               }
            }, false)
        }
    }, false);
document.getElementById('on-log-out').onclick = function () {
    alert(1)
}

