import "reflect-metadata";
import { createApolloServer, createApp, seed } from "./config";
import { connectDatabase } from "./database";

const start = async () => {
    await connectDatabase();
    const app = await createApp();
    const server = await createApolloServer(app);
    await seed();

    app.listen(process.env.PORT, () => {
        console.log(
            `Server started on http://localhost:${process.env.PORT}${server.graphqlPath}`
        );
    });
};

start();
