const { router } = require('../Router/Router');

module.exports = class Application {
    #express = require('express');
    #app = this.#express();
    constructor(port, DBURL) {
        this.configApplication();
        this.createServer(port);
        this.createRoutes();
        this.configDatabase(DBURL);
        this.errorHandler();

    }
    configApplication(){
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended: true}));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    }
    createServer(port){
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(port, () =>{
            console.log(`Server Run On http://localhost:${port}`);
        });
    }
    configDatabase(DBURL){
        const mongoose = require('mongoose');
        mongoose.connect(DBURL, (error) => {
            if(error) throw error;
            return console.log("Connect DB Successful ...");
        });
    }
    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Page Not Found"
            });
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "Internal Server Error";

            return res.status(status).json({
                status,
                message,
                success: false
            })
        })
    }
    createRoutes(){
        this.#app.get('/', (req, res, next) => {
            return res.json({
                message: "This is a new Express Application"
            });
        })
        this.#app.use(router)
        // this.#app.use((err, req, res, next) => {
        //     try {
        //     } catch (error) {
        //         next(error);
        //     }
        // })
    }
}