window.onload = function () {
    if (JSON.parse(localStorage.getItem('lesServicesIdCustomer'))){
        window.location.href = '/';
        return;
    }
}
