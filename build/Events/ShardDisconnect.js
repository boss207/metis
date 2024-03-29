"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const config = require('../../config.json');
main_1.Metis.client.on('shardDisconnect', async (err, id) => {
    let logTime = new Date().toLocaleTimeString('en-us', { timeZone: 'America/New_York' });
    let logDate = new Date().toLocaleDateString();
    if (err) {
        main_1.Metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, {
            embeds: [{
                    color: main_1.Metis.colors.red,
                    description: `\`${logDate}  ${logTime}\` <@!${main_1.Metis.client.user.id}> [SHARD DISCONNECT] Shard: \`${id}\`\n${err.name}: ${err.message}`
                }]
        }).catch((error) => { });
    }
    else {
        main_1.Metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, {
            embeds: [{
                    color: main_1.Metis.colors.red,
                    description: `\`${logDate}  ${logTime}\` <@!${main_1.Metis.client.user.id}> [SHARD DISCONNECT] Shard: \`${id}\``
                }]
        }).catch((error) => { });
    }
});
