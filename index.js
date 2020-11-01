const discord = require('discord.js');

const client = new discord.Client();
const fs = require("fs");
client.commands = new discord.Collection();
require('dotenv').config();
const activities_list = [
    "Applications",
    "Applications"
];

client.login(process.env.DISCORD_TOKEN);

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("Cant find any files")
        return;
    }

    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is watching wiki.justreddy.cf`)

        client.commands.set(fileGet.help.name, fileGet);
    })

});


client.on('ready', async () => {
    console.log(`Im vibin with my music`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: "WATCHING" }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000);
});

client.on("message", async message =>{

    if(message.author.bot) return;


    if(message.channel.type == "dm") return;

    var prefix = "-";
    if(!message.content.startsWith(prefix)) return;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);


    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client, message, args);
});