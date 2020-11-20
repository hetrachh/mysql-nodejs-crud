const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'het123',
    database: 'crud'
})

mysqlConnection.connect((err) => {
    if (!err)
    {
        console.log("db");
    } else {
        console.log(JSON.stringify(err, undefined, 2))
    }
})

app.listen(3000, () => console.log('Express server is running'));

//list item
app.get('/employees', (req, res) => {
    mysqlConnection.query('select * from crud_app', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
            console.log(rows)
        } else {
            console.log(JSON.stringify(err))
        }
    })
})

//Get by id
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('select * from crud_app where id = ?', [req.params.id] ,(err, rows, fields) => {
        if (!err) {
            res.send(rows)
            console.log(rows)
        } else {
            console.log(JSON.stringify(err))
        }
    })
})

//delete by id
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('delete from crud_app where id = ?', [req.params.id] ,(err, rows, fields) => {
        if (!err) {
            res.send('Deleted success')
            console.log(rows)
        } else {
            console.log(JSON.stringify(err))
        }
    })
})

//insert
app.post('/employees', (req, res) => {
    mysqlConnection.query('insert into crud_app  (name, descp) values (?, ?) ', [req.body.name, req.body.descp] ,(err, rows, fields) => {
        if (!err) {
            res.send('Inserted')
            console.log(rows)
        } else {
            console.log(JSON.stringify(err))
        }
    })
})

//update
app.put('/employees/:id', (req, res) => {
    mysqlConnection.query('update crud_app set name = ?, descp = ?  where id = ? ', [req.body.name, req.body.descp, req.params.id] ,(err, rows, fields) => {
        if (!err) {
            res.send('Updated')
            console.log(rows)
        } else {
            console.log(JSON.stringify(err))
        }
    })
})