import mongoose from 'mongoose'

import { itemSchema } from './postItem'


const itemModel = mongoose.model('itemModel', itemSchema);

export { itemModel }
