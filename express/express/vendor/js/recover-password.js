const shw = document.getElementById('shw-pwd');
const npwd = document.getElementById('new-pwd');
const npwdc = document.getElementById('new-pwd-c');
const btnC = document.getElementById('btnC');

shw.addEventListener('click',(e) => {
   if (npwd.type === 'text'){
       shw.classList.add('fa-eye-slash');
       npwd.type = 'password';
       npwdc.type = 'password';
   } else {
       shw.classList.remove('fa-eye-slash');
       npwd.type = 'text';
       npwdc.type = 'text';
   }
});
