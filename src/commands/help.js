const path = require("path");
const Command = require(path.resolve("src", "base", "Command"));

class help extends Command {

    constructor(client) {
        super(client, {
            name: "help",
            description: "Help Command.",
            usage: "help <cmd>",
            enabled: true,
            aliases: ["h", "cmds", "commands"]
        })
    }

    async run(message, args, Eris) {
        if(args.join(" ") && (this.client.commands.has(args.join(" ")) || this.client.aliases.has(args.join(" ")))) {
            const command = this.client.commands.get(args.join(" ")) || this.client.commands.get(this.client.commands.get(args.join(" ")));
            const embed = {
                title: `${args.join(" ").charAt(0).toUpperCase() + args.join(" ").substring(1)} Command Information`,
                color: 0x00ffff,
                fields: [
                    {
                        name: `Nama`,
                        value: `${command.help.name}`,
                        inline: false
                    },
                    {
                        name: `Deskripsi`,
                        value: `${command.help.description}`,
                        inline: false
                    },
                    {
                        name: `Pemakaian`,
                        value: `\`${command.help.usage}\``,
                        inline: false
                    },
                    {
                        name: `Alias`,
                        value: `${command.help.aliases.map(alias => `\`${alias}\``).join(", ") || "None"}`,
                        inline: false
                    }
                ],
                footer: {
                    text: `Buatan Indonesia`
                }
              };
              message.channel.createMessage({ embed: embed });
            } else {
                const embed = {
                    color: 0x00ffff,
                    fields: [
                        {
                            name: `${this.client.emojis.music} | Command Musik`,
                            value: `${this.client.commands.map(cmd => `\`${cmd.help.name}\``).join(", ")}`,
                            inline: false
                        }
                    ],
                    footer: {
                        text: `khusus command musik anda bisa menggunakan ${this.client.prefix}help <command>` 
                    }
              };
              message.channel.createMessage({ embed: embed });
          }
      }

}

module.exports = help;
