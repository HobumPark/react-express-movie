const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = require('./fileUploadAction');//업로드 기능을 가져옴

router.use(bodyParser.json());


router.get('/movie_preview_list.json', (req, res) => {
    console.log('/api/v4/movie_preview_board.json')
    const page = req.query.page
    const startIndex = (page-1)*10
    db.query(`select * from movie_preview_board order by no desc limit ${startIndex},10` , (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_preview_res : data });
        else res.send(err);
    })
})

router.get('/movie_preview_view.json', (req, res) => {
    console.log('/api/v4/movie_preview_view.json')
    const no = req.query.no
 
    db.query(`select * from movie_preview_board where no=${no}` , (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_preview_res : data });
        else res.send(err);
    })
})

router.get('/movie_preview_count.json', (req, res) => {
    console.log('/api/v4/movie_preview_count.json')
    db.query(`select count(*) as cnt from movie_preview_board` , (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_preview_res : data });
        else res.send(err);
    })
})

router.post('/movie_preview_write', (req, res) => {
    console.log('/api/v4/movie_preview_write')
    console.log(req.body)
    const {title,contents,writer,write_date,attach,hits}=req.body
    db.query(`insert into 
    movie_preview_board(title,contents,writer,write_date,attach,hits) 
    values('${title}','${contents}','${writer}','${write_date}','${attach}',${hits})` , (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_preview_res : data });
        else res.send(err);
    })
})

router.put('/movie_preview_update', (req, res) => {
    console.log('/api/v4/movie_preview_update')
    console.log(req.body)
    const {no,title,contents}=req.body
    db.query(`update movie_preview_board
    set title='${title}', contents='${contents}'
    where no=${no}` , (err, data) => {
        console.log(data)
        if(!err) res.send({ movie_preview_res : data });
        else res.send(err);
    })
})

router.post('/file_upload', (req, res, next) => {
    console.log('/api/v4/file_upload')
    //console.log(req);
    console.log(req.file);
    console.log(req.addtime);
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          return next(err);
        } else if (err) {
          return next(err);
        }
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('등록시간 : ' + req.addtime)
        console.log('저장파일명 : ' + req.file.filename)
        console.log('크기 : ' + req.file.size)
        return res.json({success:1,savefile:req.file.filename});
      });
})



router.get('/indi-theater.json', (req, res) => {
    console.log('/api/v4/get/indi-theater.json')
    db.query(`select * from indi_theater`, (err, data) => {
        if(!err) res.send({ theater_res : data });
        else res.send(err);
    })
})


module.exports = router;