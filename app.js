const yargs = require("yargs");
const {pertanyaan,saveData, listQuotes, findByAuthor, removeQuote} = require('./system');

// add quote
yargs.command({
    command: 'add',
    describe: 'Add new quote',
    builder: {
        name: {
            describe: "Quote author",
            demandOption: true,
            type: 'string'
        },
        quote: {
            describe: "Quote",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        saveData(argv.name, argv.quote);
    }
}).demandCommand();

// list all quotes
yargs.command({
    command: 'list',
    describe: 'Listing all quotes',
    handler(){
        listQuotes();
    }
});

// find by Author
yargs.command({
    command: 'find',
    describe: 'Find quotes by author\'s name',
    builder: {
        'name': {
            describe: 'Name of the author',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        findByAuthor(argv.name);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove quote',
    builder: {
        'quote': {
            describe: 'Quote',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        removeQuote(argv.quote);
    }
});

yargs.parse();