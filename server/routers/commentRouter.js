const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/get/comment/latest', (req, res) => {
    console.log('/api/v2/get/comment/latest')
    db.query(`select * from movie_comment order by write_date desc limit 0,10`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

router.get('/get/comment/oldest', (req, res) => {
    console.log('/api/v2/get/comment/oldest')
    db.query(`select * from movie_comment order by write_date asc limit 0,10`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

router.get('/get/comment/pros', (req, res) => {
    console.log('/api/v2/get/comment/pros')
    db.query(`select * from movie_comment order by pros desc`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

router.get('/get/comment/more/:page', (req, res) => {
    console.log('/api/v2/get/comment/more')
    const page = req.params.page
    console.log(page)
    const startIndex = page*10
    db.query(`select * from movie_comment order by write_date desc limit ${startIndex},10`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

router.post('/post/comment', (req, res) => {
    console.log('/api/v2/post/comment')
    console.log(req.body)
    let {movie_id,member_id,nickname,comment,rating,pros,cons,write_date}=req.body
    console.log(movie_id)
    console.log(member_id)
    console.log(nickname)
    console.log(comment)
    console.log(rating)
    console.log(pros)
    console.log(cons)
    console.log(write_date)
    db.query(`insert into movie_comment(movie_id,member_id,nickname,comment,rating,pros,cons,write_date) values(${movie_id},'${member_id}','${nickname}','${comment}',${rating},${pros},${cons},'${write_date}')`, (err, data) => {
        if(!err){
            console.log(data);
            res.send({ comment_res : data });
        }
        else res.send(err);
    })
})

router.put('/increase/pros/:no', (req, res) => {
    console.log('/api/v2/increase/pros/:no')
    const no = req.params.no
    console.log(no)

    db.query(`select pros+1 as inc_num from movie_comment where rp_idx=${no};`, (err, data) => {
        if(!err){
            console.log(data);
            console.log(data[0].inc_num);
            const inc_num=data[0].inc_num;
            console.log(inc_num);
            db.query(`update movie_comment set pros=${inc_num} where rp_idx=${no};`, (err, data) => {
                if(!err){
                    console.log(data);
                }
                else{
                    res.send(err);
                }
            })
        }
        else{
            res.send(err);
        }
    })
})

router.put('/increase/cons/:no', (req, res) => {
    console.log('/api/v2/increase/cons/:no')
    const no = req.params.no
    console.log(no)

    db.query(`select cons+1 as inc_num from movie_comment where rp_idx=${no};`, (err, data) => {
        if(!err){
            console.log(data);
            console.log(data[0].inc_num);
            const inc_num=data[0].inc_num;
            console.log(inc_num);
            db.query(`update movie_comment set cons=${inc_num} where rp_idx=${no};`, (err, data) => {
                if(!err){
                    console.log(data);
                }
                else{
                    res.send(err);
                }
            })
        }
        else{
            res.send(err);
        }
    })
})


router.get('/get/comment/history/:id', (req, res) => {
    console.log('/api/v2/get/comment/history/:id')
    const id = req.params.id
    db.query(`select reply_idx,recommend_type from reply_recommend_history where id='${id}'`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

module.exports = router;