// (function(){
  var tb = document.getElementById('tbodylist');
  var trArr = [];
// -------------------------------------
window.addEventListener('load', ()=>{
    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000
    //   });
    fetch('/load/listing-prd/13',{
        method: 'post',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({auth:'d.me',lovme:'darone'})
    })
    .then((res)=>{
       var arrAy = [];
       arrAy = res.statusText;
       onAppending(arrAy).then((s)=>{
        console.log('appending success')
       }).catch((err)=>{
           console.log('appending error' + err)
       }) 
    })
    .catch((err)=>{
        console.log(err)
    })
}, false)
function onEditing(id){
    alert(id);
}
function onDeleting(id){
    const av = confirm('vous êtes sur le point de supprimer un produit \nVoulez-vous continuer quand même?');
    if(av){
        fetch('/action/delete/' + id,{
            method: 'post',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({auth:'d.me',lovme:'darone'})
        })
        .then((s)=>{
            if(s.status === 200){
               alert('supprimer avec succes');
               window.location.reload();
            }else{
                toastr.error('une erreur est survenue lors de l\'enregistrement');
            }
        })
        .catch(err =>{
            toastr.error('une erreur est survenue lors de l\'enregistrement' + err);
        })
    }else{
        console.log(2)
    }
}
// -------------------------------------
async function onAppending(files){
    for(let row of JSON.parse(files)){
        // 
        var tr = document.createElement('tr');
        var td_1 = document.createElement('td');
        var td_2 = document.createElement('td');
        var td_3 = document.createElement('td');
        var td_4 = document.createElement('td');
        var td_5 = document.createElement('td');
        // 
        td_1.innerHTML = row.fullname;
        td_2.innerHTML = row.price;
        td_3.innerHTML = 'En Location';
        td_4.innerHTML = '<span class="fas fa-heart text-center"></span>';
        td_5.innerHTML = '<div class="btn-group">'+
                                '<button type="button" class="btn btn-default">Action</button>'+
                                '<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">'+
                                    '<span class="sr-only">Toggle Dropdown</span>'+
                                    '<div class="dropdown-menu" role="menu">'+
                                        '<a class="dropdown-item" href="#" onclick=(onEditing('+ row.id +'))>Modifier</a>'+
                                        '<a class="dropdown-item" href="#" onclick=(onDeleting('+ row.id +'))>Supprimer</a>'+
                                        // '<a class="dropdown-item" href="#">Something else here</a>'+
                                        // '<div class="dropdown-divider"></div>'+
                                            // '<a class="dropdown-item" href="#">Separated link</a>'+
                                    '</div>'+
                                '</button>'+
                         '</div>'; 
        tr.appendChild(td_1);
        tr.appendChild(td_2);
        tr.appendChild(td_3);
        tr.appendChild(td_4);
        tr.appendChild(td_5);

        trArr.push(tr); // store all in an array
    }
    for(let td of trArr){
        tb.appendChild(td)
    }
    // 
 //    -------------------------------- 
}
//   alert(tb.innerHTML)
// })();