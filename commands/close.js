const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    var categoryID = '772518884405411840'


    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    if(message.channel.parentID === categoryID){
        await message.channel.delete()


}
    }

module.exports.help = {
    name: "close"
}