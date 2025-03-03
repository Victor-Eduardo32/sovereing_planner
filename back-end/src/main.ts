import { initializeApi } from "./config/api";
import { initializeRepositories } from "./config/repositories";
import { initializeRoutes } from "./config/routes";
import { initializeServices } from "./config/services";
import { initializeUseCases } from "./config/usecases";

function main() {
    const repositories = initializeRepositories();

    const services = initializeServices();

    const useCases = initializeUseCases(repositories, services);

    const routes = initializeRoutes(useCases);

    initializeApi(routes);
}

main()