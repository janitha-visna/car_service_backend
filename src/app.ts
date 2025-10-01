// src/app.ts
import express from "express";
import serviceRoutes from "./api/routes";
import { buildSchema } from "type-graphql";
import { ServiceResolver } from "./resolvers/service";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ErrorHandler } from "./errors/error-handler";
import { RevenueResolver } from "./resolvers/RevenueResolver";

export async function createApp() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [ServiceResolver, RevenueResolver],
    validate: true,
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(express.json()); // for parsing application/json
  app.use("/", expressMiddleware(server)); // GraphQL at "/"
 
  return app;
}
