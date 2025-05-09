'use strict'

import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
}

const routes = (app) => {

}



export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}