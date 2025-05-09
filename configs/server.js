'use strict'

import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import superHero from "../src/superhero/superhero.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
}

const routes = (app) => {
    app.use("/apiSuperHero/v1/superHero", superHero)

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