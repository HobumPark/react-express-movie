const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/movie_rank.json', (req, res) => {
    console.log('/api/v2/movie_rank.json')
    db.query(`
    select 
    B.rank_no, B.movie_code,
    A.title, A.opening_date, A.genre, A.film_rating, A.director, A.main_actor, A.audience_rating, B.reservation_rate
    from 
    movie as A
    inner join 
    movie_rank as B
    on A.movie_code=B.movie_code
    order by B.rank_no asc`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})


router.get('/movie_weekly_rank.json', (req, res) => {
    console.log('/api/v2/movie_weekly_rank.json')
    db.query(`
    select 
    A.title, A.opening_date, A.genre, A.film_rating, A.director, A.main_actor,
    A.audience_rating, A.provider,
    B.rank_no, B.movie_code,
    B.reservation_rate, FORMAT(B.audience_count , 0) as audience_count
    from 
    movie as A
    inner join 
    movie_weekly_rank as B
    on A.movie_code=B.movie_code
    order by B.rank_no asc`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_monthly_rank.json', (req, res) => {
    console.log('/api/v2/movie_monthly_rank.json')
    db.query(`
    select 
    A.title, A.opening_date, A.genre, A.film_rating, A.director, A.main_actor,
    A.audience_rating, A.provider,
    B.rank_no, B.movie_code,
    B.reservation_rate, FORMAT(B.audience_count , 0) as audience_count
    from 
    movie as A
    inner join 
    movie_monthly_rank as B
    on A.movie_code=B.movie_code
    order by B.rank_no asc`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/api/v2/movie_yearly_rank.json', (req, res) => {
    console.log('/api/v2/movie_yearly_rank.json')
    db.query(`
    select 
    A.title, A.opening_date, A.genre, A.film_rating, A.director, A.main_actor,
    A.audience_rating, A.provider,
    B.rank_no, B.movie_code,
    B.reservation_rate, FORMAT(B.audience_count , 0) as audience_count
    from 
    movie as A
    inner join 
    movie_yearly_rank as B
    on A.movie_code=B.movie_code
    order by B.rank_no asc`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

module.exports = router;