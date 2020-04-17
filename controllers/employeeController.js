const express = require('express');
const db = require('../model/connection');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('addOrEdit',{viewTitle:'Add Employee'});
})
//localhost:5000/employee
router.post('/employee',(req,res)=>{
    const user = {name:req.body.fullName,email:req.body.email,phone:req.body.mobile,city:req.body.city}
    let sql = "INSERT INTO `users` SET ?";
    db.query(sql,user,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

router.get('/employee-list',(req,res)=>{
    let sql = 'SELECT * FROM  users';
     db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('list',{list:result});
    });
})
router.get('/showalluser',(req,res)=>{
    let sql = 'SELECT * FROM  users';
    db.query(sql,(err,result)=>{
       if(err) throw err;
       console.log(result);
       res.render('updateOrdelete',{list:result});
   });
})
router.get('/update/:id',(req,res)=>{
    email = req.params.id;
    let sql = `SELECT * FROM  users where email = '${email}'`;
    db.query(sql,(err,result)=>{
       if(err) throw err;
       console.log(result);
       res.render('update',{list:result,viewTitle:'Update Empolyee'});
   });
})
router.post('/employee-update',(req,res)=>{
    console.log(req.body);
    const name =req.body.fullName;
    const email = req.body.email;
    const phone = req.body.mobile;
    const city = req.body.city;
    let sql = `UPDATE users SET name='${name}',phone='${phone}',city='${city}' WHERE email='${email}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.redirect('/showallusers');
    })
})

router.get('/delete/:id',(req,res)=>{
    const email = req.params.id;
    let sql = `DELETE from users where email ='${email}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.redirect('/showalluser');
    })
})
module.exports = router;