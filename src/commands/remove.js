const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class remove extends Command {

    constructor(client) {
        super(client, {
            name: "remove",
            description: "Removes specified Track from the Queue.",
            usage: "remove <position>",
            enabled: true,
            aliases: ["re", "rm"]
        })
    }

    async run(message, args, Eris) {
        const voiceChannel = message.member.voiceState;
        if(!voiceChannel.channelID) return message.channel.createMessage(`${this.client.emojis.cross} | Anda harus berada di Saluran Suara untuk digunakan \`${this.help.name}\` command.`);
        const queue = this.client.music.getQueue(message.channel.guild);
        if(!queue) return message.channel.createMessage(`${this.client.emojis.cross} | Tidak ada yang dimainkan untuk digunakan \`${this.help.name}\` command.`);
        const position = (args[0] && (isNaN(args[0]) == false)) ? parseInt(args[0]) - 1: false;
        if(!position || (position && position < 0)) return message.channel.createMessage(`${this.client.emojis.cross} | Tentukan Nomor Lagu yang akan dihapus.`);
        if(position > this.client.music.getQueue(message.channel.guild).songs.length) return message.channel.createMessage(`${this.client.emojis.cross} | Menentukan Nomor Lagu tidak Ada.`);
        if(position == 0) return message.channel.createMessage(`${this.client.emojis.cross} | Lagu Pemutar Saat Ini tidak dapat dihapus.`);
        const song = this.client.music.getSong(message.channel.guild, position);
        let removed = this.client.music.removeTrack(message.channel.guild, position);
        if(removed) return message.channel.createMessage(`${this.client.emojis.tick} | Dihapus **${song.title}** dari Antrian.`)
        else return message.channel.createMessage(`${this.client.emojis.tick} | Ada yang salah.`);
    }

}

module.exports = remove;