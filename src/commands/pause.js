const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class pause extends Command {

    constructor(client) {
        super(client, {
            name: "pause",
            description: "Pauses the Song.",
            usage: "pause",
            enabled: true,
            aliases: ["pa"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk digunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        const playing = this.client.music.isPlaying(message.channel.guild);
        if(playing) {
            this.client.music.pause(message.channel.guild);
            message.channel.createMessage(`${this.client.emojis.tick} | Musik telah ** Dijeda **.`);
            return;
        } else return message.channel.createMessage(`${this.client.emojis.tick} | Musik sudah ** Dijeda **.`);
    }

}

module.exports = pause;