const fs = require('fs');
const helperFunctions = require('./helperfunctions');
const filePath = "./todo.json";

function parseArgs(args) {
    const [, , command, ...options] = args;
    const parsedoptions = options.reduce((cum, elm) => {
        const [optionName, optionValue] = elm.split('=');
        cum[optionName] = optionValue;
        return cum;
    }, {});
    parsedoptions.command = command;
    return parsedoptions;
}

function main(cmdArgs) {
    // parse args first
    const parsedArgs = parseArgs(cmdArgs);

    console.log("args: ", parsedArgs);

    switch (parsedArgs.command) {
        case 'add':
            helperFunctions.add(parsedArgs);
            return;

        case 'edit':
            helperFunctions.edit(parsedArgs);
            return;

        case 'check':
            helperFunctions.changeCheck(parsedArgs, true);
            return;

        case 'uncheck':
            helperFunctions.changeCheck(parsedArgs, false);
            return;

        case 'remove':
            helperFunctions.remove(parsedArgs);
            return;

        case 'list':
            helperFunctions.list();
            return;

        case 'list-checked':
            helperFunctions.checkedTodo();
            return;

        case 'list-unchecked':
            helperFunctions.uncheckedTodo();
            return;

        default:
            console.log("command not valid!");
            return;
    }
}

function createIfNotExists(pathName) {
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, '[]')
    }
}


createIfNotExists(filePath);
main(process.argv);