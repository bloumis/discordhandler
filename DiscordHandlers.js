const discord = require('discord.js');
const fs = require('fs')
const path = require('path') 

/*
    "DiscordHandler" by Bloumis
    used discord.js and fs
*/

class DiscordHandler {
    prefix;
    #client;
    #category;
    #version = "1.0 | beta";
    constructor(prefix, category) {
        if (!prefix) throw new Error('Please Specify Prefix.')
        if (typeof category !== "boolean") throw new Error('Please Specify Boolean For Caterogys')
        this.#category = category;
        this.#client = new discord.Client();
        this.#client.commands = new discord.Collection();
        this.prefix = prefix;
    }
    
    async setName(name) {
        return new Promise(async (resolve, reject) => {
            if (!name) {
                reject("Please fill in the name of the bot changed.")  
                return
            } 
            await this.#client.user.setUsername(name).catch((e) => {
                reject(e)
            }).then(() => {
                resolve(name)
            })
        }) 
    }

    getVersion() {
        return this.#version
    }

    getAuthor() {
        return "Bloumis";
    }

    loadCommands(dir) {
        if (this.#category == true) {
            fs.readdirSync(dir).forEach(dirs => {
                const commands = fs.readdirSync(`${path.dirname(require.main.filename)}/${dir}/${dirs}/`).filter(file => file.endsWith('.js'))
    
                for (const file of commands) {
                    const getFileName = require(`${path.dirname(require.main.filename)}/${dir}/${dirs}/${file}`)
                    this.#client.commands.set(getFileName.help.name, getFileName)
                    console.log(`[COMMANDS] ${getFileName.help.name}.js succes !`)
                }
            })
        } else if (this.#category == false) {
            let commands = fs.readdirSync(dir).filter(file => file.endsWith('.js'))

            for (const file of commands) {
                const getFileName = require(`${path.dirname(require.main.filename)}/${dir}/${file}`)
                this.#client.commands.set(getFileName.help.name, getFileName)
                console.log(`[COMMANDS] ${getFileName.help.name}.js succes !`)
            }
            
        }
        this.#client.on('message', (message) => {
            if(!message.guild) return;
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;
            var args = message.content.slice(this.prefix.length).split(/ +/)
            var commandName = args.shift().toLowerCase()
            var command = this.#client.commands.get(commandName)
            if (!command) return;
            command.run(this.#client, message, args, this);
        })
    }

    loadEvents(dir) {
        if (this.#category == true) {
            fs.readdirSync(dir).forEach(dirs => {
                const events = fs.readdirSync(`${path.dirname(require.main.filename)}/${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
                                                
                for (const event of events) {
                    const evt = require(`${dir}/${dirs}/${event}`);
                    const evtName = event.split(".")[0];
                    this.#client.on(evtName, evt.bind(null, this.#client));
                    console.log(`[EVENT] ${evtName}.js succes !`);
                };
            });
        } else if (this.#category == false) {
            fs.readdirSync(dir).forEach(dirs => {
                const events = fs.readdirSync(`${path.dirname(require.main.filename)}/${dir}/`).filter(files => files.endsWith(".js"));
                                                
                for (const event of events) {
                    const evt = require(`${path.dirname(require.main.filename)}/${dir}/${event}`);
                    const evtName = event.split(".")[0];
                    this.#client.on(evtName, evt.bind(null, this.#client));
                    console.log(`[EVENT] ${evtName}.js succes !`);
                };
              });
        }
    }

    ready(callback) {
        if (!this.#client.token) {
            throw new Error('Pleasez connect the bot')
        }
        this.#client.on('ready',function(e) {
            callback(e)
        })  
    }
    
    run(token) {
        if (!token) {
            return new Error('Please Specify token')
        } else {
            try {
                this.#client.login(token)
            } catch(e) {
                return new Error('The Token Is Not Reel')
            }
        }
    }

}
module.exports = DiscordHandler;