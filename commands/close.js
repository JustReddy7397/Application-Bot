const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    var categoryID = '772518884405411840'


    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    if(message.channel.parentID === categoryID){
        await message.channel.delete()
}
    
    
    var embed = new discord.MessageEmbed()
    .setColor("AQUA")
    .setTitle(`Application of ${user}`)
    .setDescription(`Closed by ${message.author} - Accepted: ${accepted} - Reason: ${reason}`)
    .setFooter("Application Bot | By JustReddy")
    .setTimeStamp();
    
    
    var applicationStatusChannel = message.member.guild.channels.cache.find(channel => channel.name === "application-status")
    
    applicationStatusChannel.send(embed)

    
    
}

module.exports.help = {
    name: "close"
}
