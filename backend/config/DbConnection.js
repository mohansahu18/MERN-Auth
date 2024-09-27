import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB connected')
    } catch (error) {
        console.log('issue with DB connection', error)
    }
}
export default DbConnection
