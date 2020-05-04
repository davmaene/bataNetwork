var row = document.getElementById('row');
var div = [];
const getCate = (em)=>{
    switch (em) {
        case 13:
            return 'En Location'
            break;
        case 3:
            return 'En Vente'
            break;
        case 33:
            return 'Vente et Location'
            break;
        default:
            break;
    }
} 
    // row.appendChild(dv_1);
// ----------------------------------------- //
window.addEventListener('load', ()=>{
   fetch('/load/all/3', {
       method: 'post',
       headers: {'content-type':'application/json'},
       body: JSON.stringify({auth:'dav.me'})
   }).then((res)=>{
    var prd_ = [];
       prd_ = JSON.parse(res.statusText);
    //    console.log(JSON.parse(res.statusText));
    for(let prd of prd_){
        function getPrice(cat) {
            switch (cat) {
                case 3:
                    // '<small class="badge badge-primary ml-3 text-sm">USD</small>'
                    return '<b>$</b> '+prd.price;
                    break;
                case 13:
                    return '<b>$</b> '+prd.price;
                    break;
                case 33:
                    return ('<small>En location : <b>$</b></small>'+prd.priceLease +'<br><small>En vente : <b>$</b></small>'+ prd.priceSale);
                    break;
            }
        }
        var dv_1 = document.createElement('div');
        dv_1.className = 'col-lg-3 col-md-6 mb-4';
    // 
        var dv_2 = document.createElement('div');
            dv_2.className = 'card h-100';
    // dv_1.appendChild(dv_2);
    // 
    var a = document.createElement('a');
        a.id = '12';
        a.href = '/listing/single/' + prd.id;
        // a.innerHTML = '<img src="/staticsImgs/logoHeader.jpg" alt="logoHeader" srcset="" class="logo-h-w">'
    var img = document.createElement('img');
        img.src = '/dynamicsImgs/' + prd.imgprl;
        img.className = 'card-img-top';
        img.alt = 'img for prd';
        a.appendChild(img);
    // 
    var dv_2_1 = document.createElement('div');
        dv_2_1.className = 'card-body';
        dv_2_1.innerHTML = '<h4 class="card-title">'+
                                '<a href="/listing/single/'+ prd.id +'"><b class="text-uppercase">'+ prd.marque +'</b> &nbsp;'+prd.fullname +'</a>'+
                            '</h4>'+
                            '<h5>'+ getPrice(prd.categorie) +'</h5>'+
                            '<p>'+ prd.description +'</p>'+
                            '<p class="card-text badge badge-secondary">'+
                                getCate(prd.categorie)
                            +'</p>';
    var dv_2_2 = document.createElement('div');
        dv_2_2.className = 'card-footer';
        dv_2_2.innerHTML = '<small class="text-muted">★ ★ ★ ★ ☆</small>';
    // 
    dv_2.appendChild(a);
    dv_2.appendChild(dv_2_1);
    dv_2.appendChild(dv_2_2);
    dv_1.appendChild(dv_2); 
    div.push(dv_1);
    }
    for(let d of div){
        row.appendChild(d);
    }
   }).catch((err)=>{
       console.log(err)
   })
}, false)
