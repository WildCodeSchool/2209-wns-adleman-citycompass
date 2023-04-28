import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { env } from "./env";
import http from "http";
import { buildSchema } from "type-graphql";
import datasource from "./db";
import { CityResolver } from "./resolver/CityResolver";
import { CategoryResolver } from "./resolver/CategoryResolver";
import { PlaceResolver } from "./resolver/PlaceResolver";
import { SearchResolver } from "./resolver/SearchResolver";
import { UserResolver } from "./resolver/UserResolver";
import cors from "cors";
import User from "./entity/User";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export interface ContextType {
  req: any;
  res: any;
  currentUser?: User;
  jwtPayload?: any;
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
    authChecker: async ({ context }: { context: ContextType }, roles) => {
      const { req } = context;
      const tokenInHeaders = context.req.headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(req.headers.cookie ?? "").token;
      console.log(tokenInCookie);
      const token = tokenInHeaders ?? tokenInCookie;
      let decoded;
      try {
        if (token !== null) decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
        if (typeof decoded === "object") context.jwtPayload = decoded;
      } catch (err) {}

      let user;
      if (context.jwtPayload !== null) {
        const id = context.jwtPayload.userID;
        user = await datasource.getRepository(User).findOneBy({ id });
      }
      if (user !== null) context.currentUser = user;
      console.log(user);

      if (context.currentUser == null) return false;
      return roles.length === 0 || roles.includes(context.currentUser.role);
    },
  });

  const server = new ApolloServer<ContextType>({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
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
      context: async ({ req, res }) => {
        return { req, res };
      },
    })
  );

  const port = env.SERVER_PORT ?? 4000;
  httpServer.listen({ port }, () =>
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
}

start().catch(console.error);
