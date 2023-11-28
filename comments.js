// create web server
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// use body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// use mysql
const mysql = require('mysql')
// create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vue-cms'
})
// connect to database
conn.connect()

// set up cors
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// get all comments
app.get('/api/comments', (req, res) => {
  const sqlStr = 'select * from comments order by id desc'
  conn.query(sqlStr, (err, results) => {
    if (err) return res.json({ err_code: 1, message: 'get comments failed', affectedRows: 0 })
    res.json({ err_code: 0, message: results, affectedRows: 0 })
  })
})

// add comment
app.post('/api/comments/add', (req, res) => {
  const comment = req.body
  const sqlStr = 'insert into comments set ?'
  conn.query(sqlStr, comment, (err, results) => {
    if (err) return res.json({ err_code: 1, message: 'add comment failed', affectedRows: 0 })
    res.json({ err_code: 0, message: 'add comment success', affectedRows: results.affectedRows })
  })
})

// edit comment
app.post('/api/comments/edit', (req, res) => {
  const comment = req.body
  const sqlStr = 'update comments set content=?, author=?, date=? where id=?'
  conn.query(sqlStr, [comment.content, comment.author, comment.date, comment.id], (err, results) => {
    if (err) return res.json({ err_code: 1, message: 'edit comment failed', affectedRows: 0 })
    res.json({ err_code: 0, message: 'edit comment success', affectedRows: results.affectedRows })
  })
})

// delete comment
app.get('/api/comments/delete', (req, res) => {
  const id = req.query.id
  const sqlStr = 'delete from comments where id=?'
  conn.query(sqlStr, id, (err, results) => {
    if (err) return res.json({ err_code: 1, message: 'delete comment failed', affectedRows: 0 })
    res.json({ err_code: 0, message: 'delete comment success', affectedRows: results.affectedRows })
  })
})
