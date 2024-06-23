const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://beharrygabriel1:AWu3WAx9wRfw1inY@cluster0.mlnxtzy.mongodb.net/Marketplace?retryWrites=true&w=majority&appName=Cluster0" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject'
    }
    export default config
   