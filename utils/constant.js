import dotenv from 'dotenv';
dotenv.config();
const { PORT,DATABASE_URL,secretKey } = process.env;
export{secretKey,PORT,DATABASE_URL}