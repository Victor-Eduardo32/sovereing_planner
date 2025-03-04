import express, { Express } from "express"
import { Route } from "./routes/route"
import { Api } from "../api"
import { errorHandler } from "./middleware/error-handler"
import { getMiddlewares } from "./middleware/main"

export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express()
        const middlewares = getMiddlewares();
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
        this.addRoutes(routes)
        this.app.use(errorHandler)
    }

    public static create(routes: Route[]){
        return new ApiExpress(routes)
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()

            this.app[method](path, handler)
        })
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
            this.listRoutes()
        })
    }
    
    private listRoutes() {
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.log(routes)
    }
}