const express = require('express');
const app = express();
const movieRouter = require('./routers/movieRouter');
const movieRankRouter = require('./routers/movieRankRouter');
const commentRouter = require('./routers/commentRouter');
const moviePreviewRouter = require('./routers/moviePreviewRouter');
const PORT = 4000

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use('/api/v1', movieRouter);
app.use('/api/v2', movieRankRouter);
app.use('/api/v3', commentRouter);
app.use('/api/v4', moviePreviewRouter);

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

