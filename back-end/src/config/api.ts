import { ApiExpress } from "../infra/api/express/api.express"

export const initializeApi = (routes: any) => {
    const port = 8000
    const api = ApiExpress.create(routes)
    api.start(port)
}