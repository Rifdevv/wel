const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class bassboost extends Command {

    constructor(client) {
        super(client, {
            name: "bassboost",
            description: "Toggles Bassboost.",
            usage: "bassboost <on/off>",
            enabled: true,
            aliases: ["bb", "bass"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk menggunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        if(!args[0]) return message.channel.createMessage(`${this.client.emojis.music} | Bassboost saat ini **${queue.bassboost ? "Diaktifkan" : "Dinonaktifkan"}**.`);
        if(args[0].toLowerCase() == "off") {
            if(this.client.music.getBassboost(message.channel.guild) == false) return message.channel.createMessage(`${this.client.emojis.tick} | Bassboost sudah ** Dinonaktifkan **.`);
            this.client.music.setBassboost(message.channel.guild, false);
           message.channel.createMessage(`${this.client.emojis.tick} | Bassboost akan ** Dinonaktifkan ** ke Lagu Selanjutnya.`);
            return;
        }
        if(args[0].toLowerCase() == "on") {
            if(this.client.music.getBassboost(message.channel.guild) == true) return message.channel.createMessage(`${this.client.emojis.tick} | Bassboost sudah **Diaktifkan**.`);
            this.client.music.setBassboost(message.channel.guild, true);
            message.channel.createMessage(`${this.client.emojis.tick} | Bassboost akan **Diaktifkan** ke Lagu Selanjutnya.`);
            return;
        }
    }

}

module.exports = bassboost;