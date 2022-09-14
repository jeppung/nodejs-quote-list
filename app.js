const yargs = require("yargs");
const {pertanyaan,saveData} = require('./system');

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
});

yargs.parse();