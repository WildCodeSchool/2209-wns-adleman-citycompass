import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { env } from "./env";
import http from 'http';
import { buildSchema } from "type-graphql";
import datasource from "./db";
import { CityResolver } from "./resolver/CityResolver";
import { CategoryResolver } from "./resolver/CategoryResolver";
import { PlaceResolver } from "./resolver/PlaceResolver";
import { SearchResolver } from "./resolver/SearchResolver";
import { UserResolver } from "./resolver/UserResolver";
import cors from "cors"

export interface ContextType {
  req: any;
  res: any;
}

async function start(): Promise<void> {
  await datasource.initialize();
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [
      CategoryResolver,
      CityResolver,
      PlaceResolver,
      SearchResolver,
      UserResolver,
    ],
  });

  const server = new ApolloServer<ContextType>({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({embed: true})],
  });

  await server.start();

  app.use(
    ["/", "/graphql"],
    cors<cors.CorsRequest>({
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  const port = env.SERVER_PORT ?? 4000;
  httpServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
}

start().catch(console.error);