"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
const config = require('../../../config.json');
class Uptime extends Command_1.Command {
    constructor() {
        super({
            name: 'uptime',
            module: 'info',
            description: 'Displays the bot\'s uptime.',
            requiredGuilds: [],
            requiredUsers: [],
            permLevel: types_1.CommandPermissions['user'],
            showOnHelp: true,
            enabled: true,
            deleteOnUsage: false,
            aliases: ['up']
        });
    }
    async execute(metis, ctx) {
        ctx.channel.createMessage({
            embed: {
                color: metis.colors.default,
                title: 'Uptime',
                description: `${metis.util.formatTime(metis.client.uptime)}`,
                footer: { text: `${metis.client.user.username} | ${config.build} | PPID: ${process.ppid} | Shard: ${ctx.guild.shard.id}` }
            }
        });
    }
}
module.exports.cmd = Uptime;
