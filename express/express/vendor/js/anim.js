// const  thumb = document.getElementsByTagName('.product-image-thumb');
// let platform = document.getElementById('imgPlaforme');
// let plat = document.getElementById('content-img');
// for (let thmb of thumb){
//     thmb.onclick = function (evt) {
//         // console.log(plat.innerHTML)
//         plat.innerText = null;
//         const img = document.createElement('img');
//               img.src = evt.target.src;
//               img.className = 'product-image';
//               plat.appendChild(img);
//     }
// }
document.getElementById('liked').onclick = function () {
    alert('Vous aimez maintenant cette voiture');
}

