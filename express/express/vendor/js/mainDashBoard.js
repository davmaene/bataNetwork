class Adm{
    nick1;
    // nick2;
    getNick(){return this.nick1;} 
    // getNick_2(){return this.nick2;}
    setNick(nck){this.nick1 = nck;}
    // setNick_2(nck){this.nick2 = nck;}
    constructor(){
    }
}
function logMeout(){
    if(confirm('Vous ête sur le point de vous deconnecter voulez-vous vraiement continuer')){
        localStorage.removeItem('lesServicesId');
        window.location.reload()
    }
}
window.addEventListener('load', function(){
    // ----------------------------------------------------
    var init = document.getElementById('initname');
    var nick_1 = document.getElementById('nick-1');
    var nick_2 = document.getElementById('nick-2');
    if(JSON.parse(localStorage.getItem('lesServicesId')) === null){
        window.location.href = '/dashboard/login';
    }else{
        var adm = new Adm();
        adm.setNick(JSON.parse(localStorage.getItem('lesServicesId')));
        const sessioN = adm.getNick();
        // ------------------------------------------------------ //
        nick_1.innerHTML = sessioN.nick1;
        nick_2.innerHTML = sessioN.nick2;
        var in1 = sessioN.nick1;
        var in2 = sessioN.nick2;
        init.innerHTML = (in1.substring(0, 1).toUpperCase()+in2.substring(0,1).toUpperCase());

        // console.log(sessioN)
    }
}, false)
