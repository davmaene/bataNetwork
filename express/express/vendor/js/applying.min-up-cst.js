const nick1 = document.getElementById('nick1');
const nick2 = document.getElementById('nick2');
const email = document.getElementById('email-reg');
const phone = document.getElementById('phone-reg');
const pass1 = document.getElementById('pass-1');
const pass2 = document.getElementById('pass-2');
const anim = document.getElementById('animM');
const errorEm = document.getElementById('em-error');
// input here
var checkIn = {};
const _desactivateDng = (nxt) => {
    const element = document.getElementById(nxt.id + '-n');
    nxt.classList.remove('border-danger');
    element.classList.add('d-none');
};
const _selectOutPut = (nxt) => {
    const element = document.getElementById(nxt.id + '-n');
    nxt.classList.add('border-danger');
    element.classList.remove('d-none');
};
checkIn['nick1'] = (elm) => {
    const elmt = document.getElementById(elm);
    if (/^[a-z]{2,20}$/.test(elmt.value)){
        _desactivateDng(elmt);
        return true;
    }else {
        _selectOutPut(elmt);
        return false;
    }
};
checkIn['nick2'] = (elm) => {
    const elmt = document.getElementById(elm);
    if (/^[a-z]{2,20}$/.test(elmt.value)){
        _desactivateDng(elmt);
        return true;
    }else {
        _selectOutPut(elmt);
        return false;
    }
};
// checkIn['s-sgn-pr'] = (elm) => {
//     const elmt = document.getElementById(elm);
//     if (/^[a-z]{2,20}$/.test(elmt.value)){
//         _desactivateDng(elmt);
//         return true;
//     }else {
//         _selectOutPut(elmt);
//         return false;
//     }
// };
checkIn['email-reg'] = (elm) => {
    const elmt = document.getElementById(elm);
    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(elmt.value)){
        _desactivateDng(elmt);
        return true;
    }else {
        _selectOutPut(elmt);
        return false;
    }
};
checkIn['phone-reg'] = (elm) => {
    const elmt = document.getElementById(elm);
    if (/^[+]+[1-9]{1,3}[0-9]{9}$/.test(elmt.value) || /^[0]+[0-9]{9}$/.test(elmt.value)){
        _desactivateDng(elmt);
        return true;
    }else {
        _selectOutPut(elmt);
        return false;
    }
};
checkIn['pass-1'] = (elm) => {
    const elmt = document.getElementById(elm);
    if (elmt.value.length >= 6){
        _desactivateDng(elmt);
        return true;
    }else {
        _selectOutPut(elmt);
        return false;
    }
};
checkIn['pass-2'] = (elm) => {
    const elmt = document.getElementById(elm);
    if (pass1.value.length >= 6){
        if (elmt.value === pass1.value){
            _desactivateDng(elmt);
            return true;
        }else {
            _selectOutPut(elmt);
            return false;
        }
    }
};
let input = document.getElementsByTagName('input');
for (let inp of input){
    if (inp.type === 'email' || inp.type === 'password' || inp.type === 'text'){
        inp.addEventListener('blur',(e) => {
            checkIn[e.target.id](e.target.id);
        },false);
    }
}
document.getElementById('btn-enreg').addEventListener('click', function(e){
    var val = true;
    for (let k in checkIn){ 
        val = val + checkIn[k](k);
     }
     if(val){
         anim.classList.remove('d-none');
         const adm = {
             nick1: nick1.value,
             nick2: nick2.value,
             email: email.value,
             phone: phone.value,
             password: pass1.value
         };
        //  my async files
        fetch('/register/client',{
            method: 'post',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(adm)
        })
        .then((succ)=>{
            switch (succ.status) {
                case 200:
                    const adm = JSON.parse(succ.statusText);
                    localStorage.setItem('lesServicesIdCustomer', JSON.stringify({nick1:adm.nick1,nick2:adm.nick2,id:adm.id}))
                    window.location.reload();
                    break;
                case 500:
                    errorEm.classList.remove('d-none');
                    anim.classList.add('d-none');
                    break;
            }
        })
        .catch((error)=>{
            console.log(error)
        })
     }
}, false);
