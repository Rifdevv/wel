const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class stop extends Command {

    constructor(client) {
        super(client, {
            name: "stop",
            description: "Stops playing Music.",
            usage: "stop",
            enabled: true,
            aliases: ["disconnect", "end", "dc", "st", "leave"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk digunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        this.client.music.stop(message.channel.guild);
        return;
    }

}

module.exports = stop;