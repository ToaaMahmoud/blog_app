import { app } from "./app";
import { env } from "./config/env";

const startServer = async () => {
    try {
        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();