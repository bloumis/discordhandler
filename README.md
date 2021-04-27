# How To Use ?

### to start installed the discordhandler package

```bash
    npm i discordhandler
```

### after create a file and paste this

```javascript
// require the modules
const DiscordHandler = require('discordhandler');

// initialized the bot
const client = new DiscordHandler("PREFIX_BOT", false); // category True Or False

// run the bot
client.run("TOKEN_BOT")

// this function is started at the start of the bot
client.ready(function() {
    console.log(`connected in ${client.getNameBot()}`)
})

// loads commands
client.loadCommands('./DIR_NAME')
```

#### after create the folder for the handler then create a file: example.js
### And Past This

```javascript
    module.exports.run = (client, message, args, DiscordHandler) => {
        // then the commands work with discord.js
        message.channel.send("tested !" + DiscordHandler.getAuthor())
    }

    module.exports.help = {
        name : 'NAME_COMMAND'
    }
```

# and then it's over.