const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/list_movies.json', (req, res) => {
    console.log('/list_movies.json')
    console.log(req.query)
    const query_term = req.query.query_term
    db.query(`SELECT * FROM movie where title like '%${query_term}%'`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/home_slide.json', (req, res) => {
    console.log('/home_slide.json')
    db.query(`
    select 
    B.rank_no, B.movie_code,
    A.title, A.opening_date, A.genre, A.film_rating, A.director, A.main_actor, A.audience_rating, B.reservation_rate
    from 
    movie as A
    inner join 
    home_slide_movie_rank as B
    on A.movie_code=B.movie_code
    order by B.rank_no asc`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_details.json', (req, res) => {
    console.log('/movie_details.json')
    console.log(req.query)
    const id = req.query.id
    db.query(`SELECT * FROM movie where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_director_actor.json', (req, res) => {
    console.log('/movie_director_actor.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_director_actor where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/maker_info.json', (req, res) => {
    console.log('/maker_info.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM maker_info where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_company_info.json', (req, res) => {
    console.log('/movie_company_info.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_company where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})


router.get('/movie_summary.json', (req, res) => {
    console.log('/movie_summary.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_summary where movie_id=${id}`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_view_slide.json', (req, res) => {
    console.log('/movie_view_slide.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_view_slide where movie_id=${id}`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_clip_slide.json', (req, res) => {
    console.log('/api/v1/movie_clip_slide.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_clip_slide where movie_id=${id}`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/movie_photo.json', (req, res) => {
    console.log('/api/v1/movie_photo.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_photo where movie_id=${id}`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

router.get('/get/movie_popular_search', (req, res) => {
    console.log('/api/v1/get/movie_popular_search')
    db.query(`select * from movie_popular_search`, (err, data) => {
        if(!err) res.send({ res : data });
        else res.send(err);
    })
})

router.get('/get/actor_popular_search', (req, res) => {
    console.log('/api/v1/get/actor_popular_search')
    db.query(`select * from actor_popular_search`, (err, data) => {
        if(!err) res.send({ res : data });
        else res.send(err);
    })
})

router.get('/get/box_office', (req, res) => {
    console.log('/api/v1/get/box_office')
    db.query(`select * from box_office`, (err, data) => {
        if(!err) res.send({ res : data });
        else res.send(err);
    })
})

router.get('/get/recommend_search_word/:search_word', (req, res) => {
    console.log('/api/v1/get/recommend_search_word/:search_word');
    const search_word = req.params.search_word
    console.log(search_word);

    db.query(`SELECT * FROM movie where title like '%${search_word}%' limit 0,5`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })

})


module.exports = router;