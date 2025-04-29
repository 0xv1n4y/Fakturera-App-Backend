const fastify = require("fastify")({ logger: true });
 const sequilize = require("./config/database");
require('dotenv').config();

// Plugins for security and static file serving
const fastifyCors = require('@fastify/cors');
const fastifyHelmet = require('@fastify/helmet');

const PORT = process.env.PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');

const startServer = async () => {
    try {
        // Register CORS
        await fastify.register(fastifyCors, {
            origin: (origin, callback) => {
                if (!origin) return callback(null, true);
                if (ALLOWED_ORIGINS.includes(origin)) {
                    return callback(null, true);
                }
                callback(new Error("Not allowed by CORS"));
            },
            credentials: true,
        });

        // Register Helmet for security headers
        await fastify.register(fastifyHelmet, {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https:"],
                    connectSrc: ["'self'"],
                },
            },
        });
        // Register routes for the API
        fastify.register(require('./routes/terms'));
        fastify.register(require('./routes/products'));

        // Connect to the database
        await sequilize.authenticate();
        console.log("Database is connected.");
        await sequilize.sync();
        console.log("Tables synced");

        // Start the server
        fastify.listen({ port: PORT });
        console.log(`Server running at port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);   
        process.exit(1);
    }
}

startServer();
