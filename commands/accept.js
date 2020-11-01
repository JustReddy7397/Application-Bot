const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    var categoryID = '772518884405411840'

    var ticketUser = message.guild.member(message.mentions.users.first())

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    if(message.channel.parentID !== categoryID) return;
    if(!ticketUser) return message.channel.send(`Hey ${message.author}, please specify a user`) && message.delete();

    var chooseEmbed = new discord.MessageEmbed()
        .setTimestamp()
        .setTitle("Choose")
        .setColor("AQUA")
        .setFooter("Application Bot | By JustReddy")
        .addField(`Accept:`, '✅', false)
        .addField("Decline: ", '❌', false)


    var reasonEmbed = new discord.MessageEmbed()
        .setTimestamp()
        .setTitle("Choose")
        .setColor("AQUA")
        .setFooter("Application Bot | By JustReddy")
        .addField(`Reason:`, 'Please specify a reason', false)


    const filter = m => m.content;


    message.channel.send(chooseEmbed).then(async msg => {
        message.delete();

        var emoji = await promptMessage(msg, message.author, 60, ["✅", "❌"]);

        if(emoji === "✅"){
            message.channel.send(reasonEmbed).then(msg => msg.delete({timeout : 5000}))

            message.channel.awaitMessages(filter, {max:1, time: 100000}).then(collected => {
                var redenGood = collected.first();

                var redenGoodEmbed = new discord.MessageEmbed()
                    .setColor("AQUA")
                    .setFooter("Application Bot | By JustReddy")
                    .setTimestamp()
                    .setTitle("Accepted")
                    .addField("Who: ", `${ticketUser}`, false)
                    .addField("Reason: ", `${redenGood}`, false)

                message.channel.send(redenGoodEmbed)
                message.channel.bulkDelete(1);
                message.channel.setTopic(`Accepted: ${ticketUser}`)

            })
        }else if(emoji === "❌"){
            message.channel.send(reasonEmbed).then(msg => msg.delete({timeout : 5000}))

            message.channel.awaitMessages(filter, {max:1, time: 100000}).then(collected => {
                var redenBad = collected.first();

                var redenBadEmbed = new discord.MessageEmbed()
                    .setColor("AQUA")
                    .setFooter("Application Bot | By JustReddy")
                    .setTimestamp()
                    .setTitle("Declined")
                    .addField("Who: ", `${ticketUser}`, false)
                    .addField("Reason: ", `${redenBad}`, false)

                message.channel.send(redenBadEmbed)
                message.channel.bulkDelete(1);
                message.channel.setTopic(`Declined: ${ticketUser}`)

            })
        }

    })



    async function promptMessage(message, author, time, reactions) {
        time *= 1000;

        for (const reaction of reactions) {
            await message.react(reaction)
        }

        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;


        return message.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

    }


}

module.exports.help = {
    name: "accept"
}