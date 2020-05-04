// ------------------------------------------------
const dv = document.getElementById('customRadio3-cc');
const dvslls = document.getElementById('customRadio2-cc');
// ------------------------------------------------
$(document).ready(function() {
	const allowedType = ['.png','.jpg','.jpeg','.gif'];
//  file 1
 $('#imageFile').change(function(evt) {
	 const thisrc = document.getElementById('imageFile').id;
	 const out = document.getElementById('labImg');
	 var files = evt.target.files;
	 var file = files[0];
	//  if (file.name.indexOf){
		if (file) {
			const f = file.name;
			var fileext = f.substring(f.lastIndexOf('.')).toLowerCase();
			// allowedType.values(fileext) || 
			if(allowedType.indexOf(fileext) !== -1){
				var reader = new FileReader();
				reader.onload = function(e) {
					// console.log(file.name)
					document.getElementById('preview').src = e.target.result;
					out.innerHTML = '<span class="fas fa-check"></span>';
				    // console.log(img1)
				};
				reader.readAsDataURL(file);
			}else{
				alert('fichier non pris en charge')
				// evt.target.files = null;
				out.innerHTML = '<span class="text-danger">mauvais fichier</span>';
			}
		}
	//  }
 });
//  file 2
 $('#imageFile-1').change(function(evt) {
	const out = document.getElementById('labImg1');
    var files = evt.target.files;
    var file = files[0];

	if (file) {
		const f = file.name;
		var fileext = f.substring(f.lastIndexOf('.')).toLowerCase();
		// allowedType.values(fileext) || 
		if(allowedType.indexOf(fileext) !== -1){
			var reader = new FileReader();
			reader.onload = function(e) {
				// console.log(file.name)
				document.getElementById('preview-1').src = e.target.result;
				out.innerHTML = '<span class="fas fa-check"></span>';
			   //  ResizeImage(thisrc);
			};
			reader.readAsDataURL(file);
		}else{
			alert('fichier non pris en charge')
			out.innerHTML = '<span class="text-danger">mauvais fichier</span>';
		}
	}
});
//  file 3
$('#imageFile-2').change(function(evt) {
	const out = document.getElementById('labImg2');
    var files = evt.target.files;
    var file = files[0];

	if (file) {
		const f = file.name;
		var fileext = f.substring(f.lastIndexOf('.')).toLowerCase();
		// allowedType.values(fileext) || 
		if(allowedType.indexOf(fileext) !== -1){
			var reader = new FileReader();
			reader.onload = function(e) {
				// console.log(file.name)
				document.getElementById('preview-2').src = e.target.result;
				out.innerHTML = '<span class="fas fa-check"></span>';
			   //  ResizeImage(thisrc);
			};
			reader.readAsDataURL(file);
		}else{
			alert('fichier non pris en charge')
			out.innerHTML = '<span class="text-danger">mauvais fichier</span>';
		}
	}
});
//  file 4
$('#imageFile-3').change(function(evt) {
	const out = document.getElementById('labImg3');
    var files = evt.target.files;
    var file = files[0];

	if (file) {
		const f = file.name;
		var fileext = f.substring(f.lastIndexOf('.')).toLowerCase();
		// allowedType.values(fileext) || 
		if(allowedType.indexOf(fileext) !== -1){
			var reader = new FileReader();
			reader.onload = function(e) {
				// console.log(file.name)
				document.getElementById('preview-3').src = e.target.result;
				out.innerHTML = '<span class="fas fa-check"></span>';
			   //  ResizeImage(thisrc);
			};
			reader.readAsDataURL(file);
		}else{
			alert('fichier non pris en charge')
			out.innerHTML = '<span class="text-danger">mauvais fichier</span>';
		}
	}
});
// file 5
$('#imageFile-4').change(function(evt) {
	const out = document.getElementById('labImg4');
    var files = evt.target.files;
    var file = files[0];

	if (file) {
		const f = file.name;
		var fileext = f.substring(f.lastIndexOf('.')).toLowerCase();
		// allowedType.values(fileext) || 
		if(allowedType.indexOf(fileext) !== -1){
			var reader = new FileReader();
			reader.onload = function(e) {
				// console.log(file.name)
				document.getElementById('preview-4').src = e.target.result;
				out.innerHTML = '<span class="fas fa-check"></span>';
			   //  ResizeImage(thisrc);
			};
			reader.readAsDataURL(file);
		}else{
			alert('fichier non pris en charge')
			out.innerHTML = '<span class="text-danger">mauvais fichier</span>';
		}
	}
    });
});
// on uploading file 
$('#onSending-off').click(function(evt){
	const input = document.getElementsByTagName('input')
	const ann = document.getElementById('animate');
	var b = [];
	for (let i = 0; i < input.length; i++){
		if (input[i].type === 'text' || input[i].type === 'password' || input[i].type === 'number'){
			if(input[i].value !== ''){
				b.push(input[i])
			}
		}
	}
	if (b.length === 9){
		ann.classList.remove('d-none');
	}
	// const form = new FormData(document.getElementById('addprd'));

	// if (form)
	// alert(form.sieges.value)
	// console.log(form.value)
});
$('#customRadio3').click(function(evt){
	dv.classList.remove('d-none');
	document.getElementById('pricelease').required = true;
	document.getElementById('pricesale').required = true;
	document.getElementById('price').value = null;
	document.getElementById('pricelease').disabled = false;
	document.getElementById('pricesale').disabled = false;
	document.getElementById('price').disabled = true;
	dvslls.classList.add('d-none');
	// dv.parentNode.removeChild(document.getElementById('price'))
})
$('#customRadio2').click(function(evt){
	dvslls.classList.remove('d-none');
	document.getElementById('pricelease').value = null;
	document.getElementById('pricesale').value = null;
	document.getElementById('pricelease').disabled = true;
	document.getElementById('pricesale').disabled = true;
	document.getElementById('price').required = true;
	document.getElementById('price').disabled = false;
	dv.classList.add('d-none');
})
$('#customRadio1').click(function(evt){
	dvslls.classList.remove('d-none');
	dv.classList.add('d-none');
	document.getElementById('pricelease').value = null;
	document.getElementById('pricesale').value = null;
	document.getElementById('price').required = true;
	document.getElementById('pricelease').disabled = true;
	document.getElementById('pricesale').disabled = true;
	document.getElementById('price').disabled = false;
})
function ResizeImage(id) {
 if (window.File && window.FileReader && window.FileList && window.Blob) {
	 var filesToUploads = document.getElementById(id).files;
	 var file = filesToUploads[0];
	 if (file) {
		 var reader = new FileReader();
		 // Set the image once loaded into file reader
		 reader.onload = function(e) {

			 var img = document.createElement("img");
			 img.src = e.target.result;

			 var canvas = document.createElement("canvas");
			 var ctx = canvas.getContext("2d");
			 ctx.drawImage(img, 0, 0);

			 var MAX_WIDTH = 400;
			 var MAX_HEIGHT = 400;
			 var width = img.width;
			 var height = img.height;

			 if (width > height) {
				 if (width > MAX_WIDTH) {
					 height *= MAX_WIDTH / width;
					 width = MAX_WIDTH;
				 }
			 } else {
				 if (height > MAX_HEIGHT) {
					 width *= MAX_HEIGHT / height;
					 height = MAX_HEIGHT;
				 }
			 }
			 canvas.width = width;
			 canvas.height = height;
			 var ctx = canvas.getContext("2d");
			 ctx.drawImage(img, 0, 0, width, height);

			 dataurl = canvas.toDataURL(file.type);
			 document.getElementById('preview-1').src = dataurl;
			 console.log(dataurl);
		 }
		 reader.readAsDataURL(file);

	 }

    } else {
        alert('Votre navigateur ne supporte pas ces API');
    }
}
