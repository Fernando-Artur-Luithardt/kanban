import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import corsMiddleware from "./cors";

export default function middlewares(server: FastifyInstance<Server<typeof IncomingMessage, typeof ServerResponse>>) {
    corsMiddleware(server);
}