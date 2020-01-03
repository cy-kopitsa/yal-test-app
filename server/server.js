import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import https from 'https';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.get('/users', (req, res, next) => {
    https.get(process.env.URL, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        res.status(200).send(data);
    });

    }).on('error', (err) => {
        console.log(`Error: ${err.message}`);
        next();
    });
});

if (process.env.NODE_ENV === 'production') {
    const clientStaticFiles = express.static(path.join(__dirname, '../../client/build'))
    app.use(clientStaticFiles);
    app.use('/*', clientStaticFiles);
}

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`);
});  