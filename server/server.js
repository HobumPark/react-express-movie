const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/api/v1/list_movies.json', (req, res) => {
    console.log('/api/v1/list_movies.json')
    console.log(req.query)
    const query_term = req.query.query_term
    db.query(`SELECT * FROM movie where title like '%${query_term}%'`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

app.get('/api/v1/home_slide.json', (req, res) => {
    console.log('/api/v1/home_slide.json')
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

app.get('/api/v1/movie_details.json', (req, res) => {
    console.log('/api/v1/movie_details.json')
    console.log(req.query)
    const id = req.query.id
    db.query(`SELECT * FROM movie where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

app.get('/api/v1/movie_director_actor.json', (req, res) => {
    console.log('/api/v1/movie_director_actor.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_director_actor where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

app.get('/api/v1/movie_summary.json', (req, res) => {
    console.log('/api/v1/movie_summary.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_summary where movie_id=${id}`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

app.get('/api/v1/maker_info.json', (req, res) => {
    console.log('/maker_info.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM maker where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

app.get('/api/v1/movie_company_info.json', (req, res) => {
    console.log('/movie_company_info.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_company where movie_code=${id}`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})



app.get('/api/v1/movie_view_slide.json', (req, res) => {
    console.log('/api/v1/movie_view_slide.json')
    console.log(req.query)
    console.log(req.query.id)
    const id = req.query.id
    db.query(`SELECT * FROM movie_view_slide where movie_id=${id}`, (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })
})

app.get('/api/v1/movie_clip_slide.json', (req, res) => {
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

app.get('/api/v1/movie_photo.json', (req, res) => {
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

app.get('/api/v1/get/movie_popular_search', (req, res) => {
    console.log('/api/v1/get/movie_popular_search')
    db.query(`select * from movie_popular_search`, (err, data) => {
        if(!err) res.send({ res : data });
        else res.send(err);
    })
})

app.get('/api/v1/get/actor_popular_search', (req, res) => {
    console.log('/api/v1/get/actor_popular_search')
    db.query(`select * from actor_popular_search`, (err, data) => {
        if(!err) res.send({ res : data });
        else res.send(err);
    })
})

app.get('/api/v1/get/box_office', (req, res) => {
    console.log('/api/v1/get/box_office')
    db.query(`select * from box_office`, (err, data) => {
        if(!err) res.send({ res : data });
        else res.send(err);
    })
})

app.get('/api/v1/get/recommend_search_word/:search_word', (req, res) => {
    console.log('/api/v1/get/recommend_search_word/:search_word');
    const search_word = req.params.search_word
    console.log(search_word);

    db.query(`SELECT * FROM movie where title like '%${search_word}%' limit 0,5`, (err, data) => {
        if(!err) res.send({ movie_res : data });
        else res.send(err);
    })

})


/* 영화 랭킹*/
app.get('/api/v2/movie_rank.json', (req, res) => {
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

app.get('/api/v2/movie_weekly_rank.json', (req, res) => {
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

app.get('/api/v2/movie_monthly_rank.json', (req, res) => {
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

app.get('/api/v2/movie_yearly_rank.json', (req, res) => {
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


/* 댓글 */
app.get('/api/v3/get/comment/latest', (req, res) => {
    console.log('/api/v2/get/comment/latest')
    db.query(`select * from movie_comment order by write_date desc limit 0,10`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

app.get('/api/v3/get/comment/oldest', (req, res) => {
    console.log('/api/v2/get/comment/oldest')
    db.query(`select * from movie_comment order by write_date asc limit 0,10`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

app.get('/api/v3/get/comment/pros', (req, res) => {
    console.log('/api/v2/get/comment/pros')
    db.query(`select * from movie_comment order by pros desc`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

app.get('/api/v3/get/comment/more/:page', (req, res) => {
    console.log('/api/v2/get/comment/more')
    const page = req.params.page
    console.log(page)
    const startIndex = page*10
    db.query(`select * from movie_comment order by write_date desc limit ${startIndex},10`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

app.post('/api/v3/post/comment', (req, res) => {
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

app.put('/api/v3/increase/pros/:no', (req, res) => {
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

app.put('/api/v3/increase/cons/:no', (req, res) => {
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


app.get('/api/v3/get/comment/history/:id', (req, res) => {
    console.log('/api/v2/get/comment/history/:id')
    const id = req.params.id
    db.query(`select reply_idx,recommend_type from reply_recommend_history where id='${id}'`, (err, data) => {
        if(!err) res.send({ comment_res : data });
        else res.send(err);
    })
})

app.get('/api/v4/indi-theater.json', (req, res) => {
    console.log('/api/v4/get/indi-theater.json')
    db.query(`select * from indi_theater`, (err, data) => {
        if(!err) res.send({ theater_res : data });
        else res.send(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

