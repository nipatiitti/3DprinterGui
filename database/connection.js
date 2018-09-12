import mongoose from 'mongoose'
import CONFIG from'../config'

// Connect to the database in mongoDB atlas
mongoose.connect(`mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`)

const db = mongoose.connection

export default db
