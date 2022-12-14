import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";

class Help extends Command { 
    constructor(){
        super({
            name: 'help', 
            module: 'info', 
            description: 'Lists the bot\'s commands or gives information on a specific command.', 
            usage: 'help [command name]', 
            example: 'serverinfo', 
            requiredGuilds: [], 
            requiredUsers: [], 
            deleteOnUsage: false, 
            showOnHelp: true, 
            permLevel: CommandPermissions['user'], 
            enabled: true, 
            aliases: ['command-info']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        const infoCmds = metis.commands.filter(c => c.module === 'info');
        const devCmds = metis.commands.filter(c => c.module === 'dev')

        const cmdEmbed = { 
            embed: { 
                color: metis.colors.blue, 
                author: { name: `${metis.client.user.username}'s Commands`}, 
                fields: [
                    { name: 'Info', value: infoCmds.map(a => `\`${a.name}\``).join(", ")}
                ], 
                timestamp: new Date(),
            }
        }
        if (metis.developer.includes(ctx.user.id)) { 
            cmdEmbed.embed.fields.push({ 
                name: 'Dev', 
                value: devCmds.map(a => `\`${a.name}\``).join(', ')
            })
        }
        
        if (!ctx.args[0]) { 
           return ctx.channel.createMessage(cmdEmbed)
        }
        
        const cmd = metis.commands.get(ctx.args[0]) || metis.commands.find(cmd => cmd.aliases && cmd.aliases.includes(ctx.args[0]))
        
        if (!cmd) { 
            return ctx.channel.createMessage(cmdEmbed)
        }

        const data = { 
            embed: { 
                color: metis.colors.blue, 
                title: `${cmd.module.toLowerCase()}:${cmd.name}`, 
                description: cmd.description, 
                fields: []
            }
        }

        if (cmd.usage) { 
            data.embed.fields.push({
                name: 'Usage:', 
                value: `\`${cmd.usage}\``
            })
        } else { 
            data.embed.fields.push({
                name: 'Usage:', 
                value: `\`${cmd.name}\``
            })
        }
        if (cmd.example) { 
            data.embed.fields.push({
                name: 'Example:', 
                value: `\`${cmd.example}\``
            })
        }

        if (cmd.aliases) { 
            data.embed.fields.push({
                name: 'Aliases:', 
                value: cmd.aliases.map(a => `\`${a}\``).join(", ")
            })
        }

        if (cmd.permLevel === 0) { 
            data.embed.fields.push({
                name: 'Permissions:', 
                value: 'User'
            })
        }
        if (cmd.permLevel === 1) { 
            data.embed.fields.push({
                name: 'Permissions:', 
                value: 'Server Moderator'
            })
        }
        if (cmd.permLevel === 2) { 
            data.embed.fields.push({
                name: 'Permissions:', 
                value: 'Server Manager'
            })
        }
        if (cmd.permLevel === 3) { 
            data.embed.fields.push({
                name: 'Permissions:', 
                value: 'Support Staff'
            })
        }
        if (cmd.permLevel === 4) { 
            data.embed.fields.push({
                name: 'Permissions:', 
                value: 'Developer'
            })
        }


        if (cmd) { 
           return ctx.channel.createMessage(data)
        }
     }

        
}
module.exports.cmd = Help;