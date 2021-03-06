if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: `${require('path').join(__dirname, '.')}/.env`});
    const port = process.env.PORT || 3000;
    require('./src/server').listen(port);
    console.log(`Server is running on port ${port}`);
} else {
    /**
     *  Creates a function instance and with a specific specs.
     *  Serve to FireBase Express server obj.
     */
    process.env.TZ = 'Asia/Jerusalem'
    exports[require('./package').name] = require('firebase-functions')
        .region('europe-west3')
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .https.onRequest(require('./src/server'));
}
