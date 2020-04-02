const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class shuffle extends Command {

    constructor(client) {
        super(client, {
            name: "shuffle",
            description: "Shuffles the Music Queue.",
            usage: "shuffle",
            enabled: true,
            aliases: ["sh"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk digunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        this.client.music.shuffle(message.channel.guild);
        message.channel.createMessage(`${this.client.emojis.tick} | Antrian Musik telah ** Diacak **.`);
        return;
    }

}

module.exports = shuffle;