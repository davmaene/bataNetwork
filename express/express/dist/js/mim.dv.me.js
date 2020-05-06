window.onload = function () {
    // const dv_1 = document.getElementById('lvl-1-container');
    const imgContent = document.getElementById('content-img');
    const mrqContent = document.getElementById('txt-marque');
    const priceContent = document.getElementById('price-content');
    const clrContent = document.getElementById('color-content');
    const essContent = document.getElementById('ess-content');
    const imgThumb = document.getElementById('content-imgs-thumb');
    //
    // -------------- characteristics -------------- //
    const conMarq = document.getElementById('con-model');
    const conModel = document.getElementById('con-marque');
    const conWhl = document.getElementById('con-whl');
    const conTrans = document.getElementById('con-trs');
    const conDoors = document.getElementById('con-doors');
    const conSit  = document.getElementById('con-sit');
    const conColor = document.getElementById('con-color');
    // -------------------------------------------------
    const item = window.location.href;
    // console.log(getParameterByName(item));
    const sub = item.substring(item.lastIndexOf('/') + 1).toString();
    const emb = parseInt(sub); // params
    const span = document.createElement('span');
    span.className = 'spinner-grow spinner-grow-sm';
    span.id = 'ann-grow';
    //
    // ----------------------------
    if (!isNaN(emb)){
        fetch('/listing/single/'+ emb,{
            method: 'post',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({idprd: emb})
        }).then((res)=>{
            const hldOn = JSON.parse(res.statusText);
            //     ----------------------------------
            const img1 = document.createElement('img');
            img1.src = '/dynamicsImgs/' + hldOn.img1;
            img1.className = 'sml border p-1 product-image-thumb';
            img1.id = 'img-1';
            const img2 = document.createElement('img');
            img2.src = '/dynamicsImgs/' + hldOn.img2;
            img2.className = 'sml border p-1 product-image-thumb';
            img1.id = 'img-2';
            const img3 = document.createElement('img');
            img3.src = '/dynamicsImgs/' + hldOn.img3;
            img3.className = 'sml border p-1 product-image-thumb';
            img1.id = 'img-3';
            const img4 = document.createElement('img');
            img4.src = '/dynamicsImgs/' + hldOn.img4;
            img4.className = 'sml border p-1 product-image-thumb';
            img1.id = 'img-4';
            const img5 = document.createElement('img');
            img5.src = '/dynamicsImgs/' + hldOn.imgprl;
            img5.className = 'sml border p-1 product-image-thumb';
            img5.id = 'img-5';
            //    ----------------------------------
            imgContent.innerText = null;
            imgThumb.appendChild(img5);
            imgThumb.appendChild(img1);
            imgThumb.appendChild(img2);
            imgThumb.appendChild(img3);
            imgThumb.appendChild(img4);

            const imgBox = [img1,img2,img3,img4,img5];
            const onGetIt = document.getElementById('onGetIt');
            //     ----------------------------------
            const h3 = document.createElement('h4');
            h3.className = 'float-left';
            h3.innerHTML = '<em class="text-secondary">'+ hldOn.marque.toUpperCase() + '</em>&nbsp;'+ hldOn.fullname;
            mrqContent.appendChild(h3);
            switch (hldOn.categorie) {
                case 13:
                    priceContent.innerHTML = '$' + hldOn.price;
                    onGetIt.innerHTML = 'Louer';
                    onGetIt.addEventListener('click', function () {
                        onGetIt.appendChild(span);
                        window.location.href = '/get-prd/'+(new Date().getTime())+'/auth/'+(new Date().getSeconds())+'/state-account/true/step/'+ hldOn.id+'?cat=13';
                    });
                    break;
                case 3:
                    priceContent.innerHTML = '$' + hldOn.price;
                    onGetIt.innerHTML = 'Acheter';
                    onGetIt.addEventListener('click', function () {
                        onGetIt.appendChild(span);
                        window.location.href = '/get-prd/'+(new Date().getTime())+'/auth/'+(new Date().getSeconds())+'/state-account/true/step/'+ hldOn.id+'?cat=3';
                    });
                    break;
                case 33:
                    onGetIt.innerHTML = 'Acheter ou Louer ?';
                    const onGetItPre = document.getElementById('onGetIt-pre');
                    const divbtn = document.createElement('div');
                    divbtn.className = 'btn-group col-lg-12 pt-2';
                    const btnLf = document.createElement('button');
                    btnLf.className = 'btn btn-success';
                    btnLf.innerHTML = 'Louer';
                    divbtn.appendChild(btnLf);
                    //
                    const btnRght = document.createElement('button');
                    btnRght.className = 'btn btn-primary';
                    btnRght.innerHTML = 'Acheter';
                    divbtn.appendChild(btnRght);
                    // onGetIt.appendChild(divbtn);
                    //
                    btnLf.onclick = function(evt){
                        evt.target.appendChild(span);
                        window.location.href = '/get-prd/'+(new Date().getTime())+'/auth/'+(new Date().getSeconds())+'/state-account/true/step/'+ hldOn.id+'?cat=13&qfrom=33'; 
                    }
                    btnRght.onclick = function(evt){
                        evt.target.appendChild(span);
                        window.location.href = '/get-prd/'+(new Date().getTime())+'/auth/'+(new Date().getSeconds())+'/state-account/true/step/'+ hldOn.id+'?cat=3&qfrom=33'; 
                    }
                    priceContent.innerHTML = '' +
                        '<select class="form-control">' +
                        '<option value="lease">Location</option>'+
                        '<option value="sale">Vente</option>'+
                        '</select>' ;
                    onGetIt.onclick = function (evt) {
                        onGetIt.appendChild(span);
                        onGetItPre.appendChild(divbtn);

                    }
                    break;
            }
            clrContent.innerHTML = hldOn.color;
            essContent.innerHTML = hldOn.carburant;
            //      ----------------------------------
            const imgPrc = document.createElement('img');
            imgPrc.src = /dynamicsImgs/ + hldOn.imgprl;
            imgPrc.className = 'product-image border p-1 shadow';
            imgContent.appendChild(imgPrc);
            //    ------------------------------------
            console.log(JSON.parse(res.statusText));
            for (let image of imgBox){
                image.onclick = function (evt) {
                    imgContent.innerText = null;
                    const img = document.createElement('img');
                    img.src = evt.target.src;
                    img.className = 'product-image border p-1 shadow fade-in';
                    imgContent.appendChild(img);
                }
            }
        //    appending
            conMarq.innerHTML = hldOn.fullname;
            conModel.innerHTML = hldOn.marque;
            conWhl.innerHTML = hldOn.volant;
            conTrans.innerHTML = hldOn.transmission;
            conDoors.innerHTML = hldOn.doors;
            conColor.innerHTML = hldOn.color;
            conSit.innerHTML = hldOn.siege;
        //    end appending
        //    when calling billing page
        }).catch(error => {
            console.log(error)
        })
    }else {
        window.location.href = '/';
    //    catching error according to url path
    }
}
