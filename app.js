const express=require('express');
const bodyParser=require('body-parser')
const mysql=require('mysql')
const app=express()
const port=process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'Student',

})
app.get('' ,(req, res)=>{
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connction ${connection.threadId}`);
        connection.query(`select * from student_details` , (err, rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
                rows.forEach(element => {
                    console.log(element.id)  
                });

            }else{
            console.log(err);
            }
        })
    })
})


// mysql
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})