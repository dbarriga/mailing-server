const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'buddy'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);