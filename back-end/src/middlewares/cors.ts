import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import cors from "@fastify/cors";

export default function corsMiddleware(server: FastifyInstance<Server<typeof IncomingMessage, typeof ServerResponse>>) {
    server.register(cors, {
        origin: "*"
    })
}