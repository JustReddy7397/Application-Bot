const discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    var categoryID = '772518884405411840'

    var application_reviewers = '772502692974297160';

    var person = message.author;

    var channelName = "Application-" + message.author.username;

    var application = false;

    message.guild.channels.cache.forEach(channel => {
        if(channel.name.toLowerCase() === channelName.toLowerCase()){
            application = true
            return message.channel.send(`Hey ${message.author}, you already have a application open`).then(m => m.delete({timeout : 5000}));
            message.delete();
        }
    });

    if(application) return;
    var embed = new discord.MessageEmbed()
        .setTitle(`Hello ` + message.author.username)
        .setColor("AQUA")
        .setDescription(`Your channel has been made at #` + channelName.toString())
        .setFooter("Application Bot | By JustReddy")
        .setTimestamp();
    message.channel.send(embed).then(m => m.delete({timeout : 3000}));

    message.guild.channels.create(channelName, {type : "text"}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {
                    settedParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                });
                    settedParent.updateOverwrite(message.author.id,{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGE_HISTORY: true,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        CONNECT: false,
                    });
                    settedParent.updateOverwrite(message.guild.roles.cache.get(application_reviewers),{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGE_HISTORY: true,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        CONNECT: false,
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hello ` + message.author.username)
                        .setColor("AQUA")
                        .setDescription(`This is your application, Take all the time you need!`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed1 = new discord.MessageEmbed()
                        .setTitle("Question 1")
                        .setColor("AQUA")
                        .setDescription(`Who are you?`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed2 = new discord.MessageEmbed()
                        .setTitle("Question 2")
                        .setColor("AQUA")
                        .setDescription(`What is your age?`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed3 = new discord.MessageEmbed()
                        .setTitle("Question 3")
                        .setColor("AQUA")
                        .setDescription(`Why do you want to become staff?`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed4 = new discord.MessageEmbed()
                        .setTitle("Question 4")
                        .setColor("AQUA")
                        .setDescription(`Why are you different from the others?`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed5 = new discord.MessageEmbed()
                        .setTitle("Question 5")
                        .setColor("AQUA")
                        .setDescription(`What for experience do you have?`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed6 = new discord.MessageEmbed()
                        .setTitle("Question 6")
                        .setColor("AQUA")
                        .setDescription(`What are your advantages`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    var embed7 = new discord.MessageEmbed()
                        .setTitle("Question 7")
                        .setColor("AQUA")
                        .setDescription(`Something else you want to say?`)
                        .setFooter("Application Bot | By JustReddy")
                        .setTimestamp();

                    settedParent.send(message.author.id);
                    settedParent.send(embedParent);
                    settedParent.send(embed1);

                    settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                        var collected1 = collected.first();
                        settedParent.send(embed2)

                        settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                            var collected2 = collected.first();
                            settedParent.send(embed3)

                            settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                                var collected3 = collected.first();
                                settedParent.send(embed4)

                                settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                                    var collected4 = collected.first();
                                    settedParent.send(embed5)

                                    settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                                        var collected5 = collected.first();
                                        settedParent.send(embed6)

                                        settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                                            var collected6 = collected.first();
                                            settedParent.send(embed7)

                                            settedParent.awaitMessages(s => s.author.id == message.author.id, {max : 1}).then(collected => {
                                                var collected7 = collected.first();
                                                var uitkomst = new discord.MessageEmbed()
                                                    .setTitle("Thanks for applying")
                                                    .setColor("AQUA")
                                                    .setFooter("Application Bot | Made by JustReddy")
                                                    .setTimestamp()
                                                    .setDescription(`**Question 1:** ${collected1}\n\n **Question 2:** ${collected2}\n\n **Question 3:** ${collected3}\n\n **Question 4:** ${collected4}\n\n **Question 5:** ${collected5}\n\n **Question 6**: ${collected6}\n\n **Question 7:** ${collected7}`);

                                                settedParent.bulkDelete(14).then(
                                                    settedParent.send(uitkomst)
                                                );



                                            })
                                        })
                                    })
                                })
                            })
                        })

                    })

                    settedParent.send(`${person} \n <@&${application_reviewers}>`).then(s => s.delete({timeout: 1000}))

                }).catch(err => {
                    console.log(err)
            })
        })


}

module.exports.help = {
    name: "apply"
}