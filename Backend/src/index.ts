import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();