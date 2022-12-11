import {Schema, model} from "mongoose"; 

const globalSchema = new Schema({
    blacklistedUsers: [{
        username: String,
        userId: String,
        reason: String,
        date: String,
    }],
    blacklistedServers: [{
        guild: String,
        guildId: String,
        reason: String,
        date: String,
        owner: String,
        ownerId: String
    }]

})
export default model('Global', globalSchema, 'admin')