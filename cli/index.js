import * as commands from "./commands"

function main() {
    const commandName = process.argv.slice(-1)
    const command = commands[commandName]
    if (command) {
        command()
    } else {
        console.error("Command not foud")
    }
}

main()
