const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class resume extends Command {

    constructor(client) {
        super(client, {
            name: "resume",
            description: "Resumes the Song.",
            usage: "resume",
            enabled: true,
            aliases: ["re"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk digunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        const playing = this.client.music.isPlaying(message.channel.guild);
        if(playing == false) {
            this.client.music.resume(message.channel.guild);
            message.channel.createMessage(`${this.client.emojis.tick} | Musik telah ** Dilanjutkan **.`);
            return;
        } else return message.channel.createMessage(`${this.client.emojis.tick} | Musik sudah ** Dilanjutkan **.`);
    }

}

module.exports = resume;