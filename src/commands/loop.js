const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class loop extends Command {

    constructor(client) {
        super(client, {
            name: "loop",
            description: "Loops Queue/Track.",
            usage: "loop <off/queue/track>",
            enabled: true,
            aliases: ["l", "repeat"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk digunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        const current = this.client.music.getLoop(message.channel.guild);
        if(!args[0]) return message.channel.createMessage(`${this.client.emojis.cross} | Lagu yang Diulang **${this.client.music.getLoopInWords(current)}**.`);
        switch(args[0].toLowerCase()) {
            case 'off': 
                this.client.music.setLoop(message.channel.guild, 0);
                message.channel.createMessage(`${this.client.emojis.tick} | Mengulang **${this.client.music.getLoopInWords(0)}**.`);
                break;
            case 'queue': 
                this.client.music.setLoop(message.channel.guild, 1);
                message.channel.createMessage(`${this.client.emojis.tick} | Mengulang **${this.client.music.getLoopInWords(1)}**.`);
                break;
            case 'track' || 'song': 
                this.client.music.setLoop(message.channel.guild, 2);
                message.channel.createMessage(`${this.client.emojis.tick} | Mengulang **${this.client.music.getLoopInWords(2)}**.`);
                break;
            default: message.channel.createMessage(`${this.client.emojis.tick} | Lagu yang Diulang **${this.client.music.getLoopInWords(current)}**.`); break;
        }
    }

}

module.exports = loop;