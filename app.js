
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

//getting all rows 
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

// getting by specific id
app.get('/:id' ,(req, res)=>{
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connction ${connection.threadId}`);
        connection.query(`select * from student_details where id = ?`, [req.params.id] , (err, rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }else{
            console.log(err);
            }
        })
    })
})


//delete a record
app.delete('/:id' ,(req, res)=>{
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connction ${connection.threadId}`);
        connection.query(`DELETE from student_details where id = ?`, [req.params.id] , (err, rows)=>{
            connection.release()
            if(!err){
                res.send(`student with the id= ${[req.params.id]} is deleted `)
                
            }else{
            console.log(err);
            }
        })
    })
})

//INSERT DATA VIA POST
app.post('' ,(req, res)=>{
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connction ${connection.threadId}`);

        const params=req.body
        connection.query(`insert into  student_details (id , name) values (${params.id} , "${params.name}" )` , (err, rows)=>{
            connection.release()
            if(!err){
                res.send(`student with the id= ${[params.id]} is added `)
                
            }else{
            console.log(err);
            }
        })

        // console.log(req.body.id);
    })
})

//update a record
app.put('' ,(req, res)=>{
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connction ${connection.threadId}`);

        const {id, name}=req.body;
        
        connection.query(`update student_details SET name = ? where id = ? ` , [name ,id] , (err, rows)=>{
            connection.release()
            if(!err){
                res.send(`student with the id ${id} is updated `)
                
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