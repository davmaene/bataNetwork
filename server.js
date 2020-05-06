'use strict';
const http = require('http');
const express = require('express');
const path = require('path');
const formidable = require('formidable');
const port = 3000;
const fs = require('fs');
const lite = require('sqlite3');
// --------------- sqlite-Connexion-and-creating-app ----------------- //
const bd = new lite.Database('./db/_lesMilleServices.db', function(error){
    if(error) throw error;
    console.log('-- Connexion Success --');
});
// table --- product -----
const createTblprd = function(){
    const sql = 'CREATE TABLE IF NOT EXISTS _products(' +
        'id integer PRIMARY KEY,' +
        'fullname text,'+
        'price text,'+
        'imgprl text,'+
        'img1 text,'+
        'img2 text,'+
        'img3 text,'+
        'img4 text,'+
        'state integer,'+
        'categorie integer,' +
        'description text,' +
        'marque text,' +
        'priceLease integer,' +
        'priceSale integer,' +
        'transmission text,' +
        'carburant text,' +
        'volant text,' +
        'color text,' +
        'siege integer,' +
        'doors integer)';
    return bd.run(sql);
};
const createTblCommande = function(){
    // whenLeaseSale specified if lease or sale of (33 cat) so 13 for lease and 3 far sale
    const sql = 'CREATE TABLE IF NOT EXISTS _commandes_(id integer PRIMARY KEY AUTOINCREMENT NOT NULL,' +
    'idClient integer,'+
    'idProduct integer UNIQUE,'+
    'categorie integer,'+
    'whenLeaseSale integer,'+
    'timer TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)';
    return bd.run(sql);
}
const createTblYaBata = function(){
    // col 18
    const sql = 'CREATE TABLE IF NOT EXISTS _prdyabata(' +
        'id integer PRIMARY KEY,' +
        'fullname text,'+
        'price text,'+
        'imgprl text,'+
        'img1 text,'+
        'img2 text,'+
        'img3 text,'+
        'img4 text,'+
        'state integer,'+
        'categorie integer,' +
        'description text,' +
        'marque text,' +
        // 'priceLease integer,' +
        // 'priceSale integer,' +
        'transmission text,' +
        'carburant text,' +
        'volant text,' +
        'color text,' +
        'siege integer,' +
        'doors integer)';
        return bd.run(sql);
}
// table --- Admin ------
const createTableAdmin = function(){
    const sql = 'CREATE TABLE IF NOT EXISTS _admins(id integer PRIMARY KEY,' +
        'nick1 text,'+
        'nick2 text,'+
        'email text UNIQUE,'+
        'phonenumber text,'+
        'password text,' +
        'levelAbilitie integer)';
    return bd.run(sql);
};
// table ----- customer ---------
const createTableClient = function () {
    const sql = 'CREATE TABLE IF NOT EXISTS _clients(id integer PRIMARY KEY,' +
        'nick1 text,'+
        'nick2 text,'+
        'email text UNIQUE,'+
        'phonenumber text,'+
        'password text,' +
        'levelAbilitie integer)';
    return bd.run(sql);
};
// -------------------- ACTION ON DIFF TABLES ------------- //
function onLoading(opts){
    return bd.all('SELECT * FROM _products ORDER By id DESC', (error, row)=>{
        opts(error, row)
    })
}
function onCreatingAdm(me, cb){
    return bd.run('INSERT INTO _admins(nick1,nick2,email,phonenumber,password,levelAbilitie) VALUES (?,?,?,?,?,?)',me,(error)=>{
        cb(error)
    })
};
function onCreatingClient(me, cb){
    return bd.run('INSERT INTO _clients(nick1,nick2,email,phonenumber,password,levelAbilitie) VALUES (?,?,?,?,?,?)',me,(error)=>{
        cb(error)
    })
};
function onDeleting(id, cb){
    return bd.run('DELETE FROM _products WHERE id = ?',[id],(error)=>{
        cb(error)
    })
}
function onLoadingS(cat,opts){
    return bd.all('SELECT * FROM _products WHERE categorie = ? OR categorie = ? ORDER By id DESC',[cat,33],(error, row)=>{
        opts(error, row)
    })
}
function onAdding(prd, opts){
    // values default david :::: categorie = 13 for lease and 3 for sale
    return bd.run('INSERT INTO _products' +
        '(fullname,price,imgprl,img1,img2,img3,img4,state,categorie,description,marque,priceLease,priceSale,transmission,carburant,volant,color,siege,doors)' +
        'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',prd,(error)=>{
        opts(error)
    })
}
function onConnectingAdm(m, cb){
    return bd.get('SELECT * FROM _admins WHERE email = ? AND password = ?',m, (error, row)=>{
        cb(error, row)
    })
}
function onConnectingCst(cst,cb) {
    return bd.get('SELECT * FROM _clients WHERE email = ? AND password = ?',cst,(error, row)=>{
        cb(error, row)
    })
}
function onLoadingSiglePrd(id,cb) {
    bd.get('SELECT * FROM _products WHERE id = ?',[id],(error, item) =>{
        cb(error, item)
    })
}
function onMakingCommand(cmmd,cb){
    bd.run('INSERT INTO _commandes_(idClient,idProduct,categorie,whenLeaseSale) VALUES(?,?,?,?)',cmmd,(err) => {
        cb(err)
    })
}
// ---------------------------------------------------------//
createTblprd(); // table prd
createTableAdmin(); // admin table
createTableClient(); // client table
createTblCommande(); // commande table
// --------------------------------------------------------- //
// ----------------------- App ----------------------------- //
const app = express();
app.use(express.json());
app.use(express.static("express"));
// ----------------------------------------------------------------------- //
// ----------------------------------------------------------------------- //
// default URL for website
//__dirname : It will resolve statics files
// -------------------- clients -------------------------
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/express/index.html'));
});
app.get('/listing/single/:catch', function (req, res) {
    const hd = req.params.catch;
    res.sendFile(path.join(__dirname + '/express/detail.html'));
})
app.get('/profile', function (req, res) {
    res.sendfile(path.join( __dirname + '/express/profile.html'))
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/login.html'))
});
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/register.html'))
});
app.get('/forgot-password', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/forgot-password.html'))
});
app.get('/recover-password', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/recover-password.html'))
});
app.get('/cars/all-categories', function(req, res){
    res.sendFile(path.join(__dirname + '/express/listing-all.html'));
});
app.get('/get-prd/:c/auth/:cb/state-account/true/step/:v', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/product.html'))
    // console.log(req.params.c +' --------- '+ req.params.id);
});
app.get('/user/commandes', function(req, res){
    res.sendFile(path.join(__dirname + '/express/profile.html'));
});
app.get('/user/profile', function(req, res){
    res.sendfile(path.join( __dirname + '/express/profile.html'));
})
app.get('/cars/for-lease', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/listing-lease.html'))
});
app.get('/cars/for-sale', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/listing-sale.html'))
});
app.get('/about/contact', function (req, res) {
    res.sendFile(path.join(__dirname + '/express/about-us-contact.html'))
})
app.get('/cars/ku-fanya-bata', function(req, res){
    res.sendFile(path.join(__dirname + '/express/yabata.html'))
})
// --------------  admin ---------------- //
app.get('/dashboard/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/express/dashboard/inLogin.html'))
});
app.get('/register/adm', function(req, res){
    res.sendFile(path.join(__dirname + '/express/dashboard/inSignUp.html'))
})
app.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname + '/express/dashboard/index.html'))
});
app.get('/dashboard/actions/addprd', function(req, res){
    res.sendFile(path.join(__dirname + '/express/dashboard/add-product.html'))
});
app.get('/listing/sale', function(req,res){
    res.sendFile(path.join(__dirname + '/express/dashboard/listing-sale.html'))
});
app.get('/listing/laese', function(req,res){
    res.sendFile(path.join(__dirname + '/express/dashboard/listing-lease.html'))
});
// ----------------------------- routes when customer ------------------------- //
app.post('/connectingUser', function (req, res) {
    onConnectingCst([req.body.email,req.body.password],(error, row)=>{
        if (error){
            res.status(500);
            res.end();
        }
        if (!error){
            if (row){
                res.statusMessage = JSON.stringify({nick1:row.nick1,nick2:row.nick2,id:row.id});
                res.status(200);
                res.end();
            }else{
                res.statusMessage = JSON.stringify({ec:'r u a funcking guy what r u doing here' +
                                                              'create first an account then try again'});
                res.status(403);
                res.end();
            }
        }
    });
})
app.post('/register/client', function(req, res){
    onCreatingClient([
        req.body.nick1,
        req.body.nick2,
        req.body.email,
        req.body.phone,
        req.body.password,
        1000],(error) => {
        if(error) {
            res.statusMessage = JSON.stringify({error: error});
            res.status(500);
            res.end();
        }
        if(!error) {
            onConnectingCst([req.body.email, req.body.password],(error, row)=>{
                if (error){
                    res.status(500);
                    res.end();
                }
                if (!error){
                    if (row){
                        res.statusMessage = JSON.stringify({nick1:row.nick1,nick2:row.nick2,id:row.id});
                        res.status(200);
                        res.end();
                    }else{
                        res.statusMessage = JSON.stringify({ec:'r u a funcking guy what r u doing here' +
                                'create first an account then try again'});
                        res.status(403);
                        res.end();
                    }
                }
            });
        }
    })
})
app.post('/listing/single/:c', function (req, res) {
    const id = req.body.idprd || req.params.c;
    onLoadingSiglePrd(id,(error, item)=>{
        if(error){
            res.status(500);
            res.end()
        }
        if(!error){
            if (item){
                res.statusMessage = JSON.stringify(item);
                res.status(200);
                res.end();
            }else{
                res.statusMessage = JSON.stringify({auth:'david maene'})
                res.status(404);
                res.end()
            }
        }
    })
})
app.post('/load/all', function(req, res){
    onLoading((err, row)=>{
        if(err){
            res.statusMessage = JSON.stringify({error: error});
            res.status(500);
            res.end();
        };
        if(!err){
            res.statusMessage = JSON.stringify(row);
            res.status(200);
            res.end();
        }
    })
})
app.post('/load/all/:cat', function(req, res){
    const cat = req.params.cat || req.body.cat;
    onLoadingS(cat,(err, row)=>{
        if(err){
            res.statusMessage = JSON.stringify({error: error});
            res.status(500);
            res.end();
        };
        if(!err){
            res.statusMessage = JSON.stringify(row);
            res.status(200);
            res.end();
        }
    })
})
app.post('/action/commande', function(req, res){
    onMakingCommand([req.body.idClient,req.body.idCar,req.body.qcat,req.body.qfrom],(error)=>{
        if(error){
            res.status(500);
            res.end()
            console.error(error)
        }
        if(!error){
            res.status(200);
            res.end()
        }
    })
})
// --------------------------------------------------------------------- //
//  ------------------------- routes post when admin------------------------------- //

app.post('/load/listing-prd/:cat', function(req, res){
    const cat = req.params.cat;
    // console.log(cat);
    onLoadingS(cat,(error, row) => {
        if(error) {
            res.status(409);
            res.end();
        }
        if(!error){
            if (row){
                res.statusMessage = JSON.stringify(row);
                res.status(200);
                res.end();
            }else{
                // res.statusMessage = JSON.stringify(row);
                res.status(404);
                res.end();
            }
        }
    })
})
app.post('/action/add-prd', function(req, res){
    const form = new formidable.IncomingForm();
    // console.log(req.body)
    form.parse(req, function(error, fields,files){
        const imgprc = files.imageFile1;
        const img_a = files.imageFile2;
        const img_b = files.imageFile3;
        const img_c = files.imageFile4;
        const img_d = files.imageFile5;
        // ----------------------------- end files imgs ---------
        // const fullName = fields.fullname;
        // const desc = fields.desc;
        // const marque = fields.marque;
        // const price = fields.price; //  ---------------------
        // const prixLocation = fields.pricelease; //  -----------------
        // const prixVente = fields.pricesale; // --------------------
        // const volant = fields.forwheel;
        // const color = fields.color;
        // const carburant = fields.carburant;
        // const transmission = fields.transmission;
        // const sieges = fields.sieges;
        // const porte = fields.porte;
        //--------------------------------
        const cab = [imgprc, img_a, img_b, img_c, img_d]; // img's table
        // parsing array of img
        for(let img of cab){
            const newPath = '/express/dynamicsImgs/' + img.name;
            const oldPath = img.path;
            // console.log(fields.cat)
            fs.rename(oldPath, newPath, function(error){
                if(error){
                    res.status(500);
                    res.end();
                }
                if(!error){
                    // res.statusMessage = JSON.stringify({ cabme :'dvd.fulllife'});
                    // res.status(200);
                    // res.redirect(200, '/dashboard/actions/addprd');
                    // res.sendFile(path.join(__dirname + '/express/dashboard/add-product.html'))
                }
            });
        }
        switch (fields.cat) {
            case 'location':
                const prdlease = [
                    fields.fullname,
                    fields.price,
                    imgprc.name,
                    img_a.name,
                    img_b.name,
                    img_c.name,
                    img_d.name,
                    1,
                    13,
                    fields.desc,
                    fields.marque,
                    0,
                    0,
                    fields.transmission,
                    fields.carburant,
                    fields.forwheel,
                    fields.color,
                    fields.sieges,
                    fields.porte
                ];
                onAdding(prdlease, (err) => {
                    if(err) throw err;
                    if(!err){
                        // console.log(13)
                        res.statusMessage = JSON.stringify({me: 'dav.me'});
                        res.status(200);
                        res.end('<span>Le produit a été ajouté avec succes <a href="/dashboard/actions/addprd">Ajouter un autre produit</a></span><br/>'+
                            '<span><a href="https://lesmilleservices.com">Visiter le site</a></span>')
                    }
                });
                break;
            // -----------------------------------
            case 'vente':
                const prdsale = [
                fields.fullname,
                fields.price,
                imgprc.name,
                img_a.name,
                img_b.name,
                img_c.name,
                img_d.name,
                1,
                3,
                fields.desc,
                fields.marque,
                0,
                0,
                fields.transmission,
                fields.carburant,
                fields.forwheel,
                fields.color,
                fields.sieges,
                fields.porte
            ];
                onAdding(prdsale, (err) => {
                    // console.log(3)
                    if(err) throw err;
                    if(!err){
                        res.statusMessage = JSON.stringify({me: 'dav.me'});
                        res.status(200);
                        res.end()
                    }
                });
                break;
            case 'leasesale':
                const prdsalelease = [
                    fields.fullname,
                    0,
                    imgprc.name,
                    img_a.name,
                    img_b.name,
                    img_c.name,
                    img_d.name,
                    1,
                    33,
                    fields.desc,
                    fields.marque,
                    fields.pricelease,
                    fields.pricesale,
                    fields.transmission,
                    fields.carburant,
                    fields.forwheel,
                    fields.color,
                    fields.sieges,
                    fields.porte
                ];
                onAdding(prdsalelease, (err) => {
                    // console.log(33)
                    if(err) throw err;
                    if(!err){
                        res.statusMessage = JSON.stringify({me: 'dav.me'});
                        res.status(200);
                        res.end()
                    }
                });
                break;
            default:
                break;
        }
    });
});
app.post('/action/delete/:f', function(req, res){
    const id = req.params.f;
    onDeleting(id,(error)=>{
        if(error) {
            res.statusMessage = JSON.stringify({error: error});
            res.status(500);
            res.end();
        }
        if(!error){
            res.statusMessage = JSON.stringify(id);
            res.status(200);
            res.end()
        }
    })
})
app.post('/connect/admin', function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);
    onConnectingAdm([email, password],(err, row)=>{
        if(err){
            res.statusMessage = JSON.stringify({error: error});
            res.status(500);
            res.end();
        }
        if(!err){
            if(row === undefined){
                res.statusMessage = JSON.stringify({auth:'dav.me',state:'user not faound in db'})
                res.status(404);
                res.end();
            }else{
                // console.log(row)
                res.statusMessage = JSON.stringify(row);
                res.status(200);
                res.end();
            }
        };
    })
})
app.post('/register/admin', function(req, res){
    onCreatingAdm([
        req.body.nick1,
        req.body.nick2,
        req.body.email,
        req.body.phone,
        req.body.password,
        1000],(error) => {
            if(error) {
                res.statusMessage = JSON.stringify({error: error});
                res.status(500);
                res.end();
            }
            if(!error) {
                res.statusMessage = JSON.stringify({auth:'dav.me',a:req.body.email})
                res.status(200);
                res.end();
            }
        })
})
// --------------------------------------------------------------------- //
const server = http.createServer(app);
// starting server
server.listen(process.env.PORT || port, () => {
  console.debug('-- Listening on :: ' + port + ' :: status success --')
});
