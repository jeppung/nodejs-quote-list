const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pertanyaan = (q) => {
    return new Promise((resolve, reject) => {
        rl.question(`${q}: `, (value) => {
            resolve(value);
        });
    });
};

const loadFile = () => {
    const file = fs.readFileSync('./output.json', 'utf-8');
    const temp_arr = JSON.parse(file);
    return temp_arr;
}

const saveData = (name, quote) => {

    if(fs.existsSync('./output.json') == false){
        console.log(chalk.red.inverse.bold('[!] output.json not found'));
        console.log(chalk.black.bgYellow('[!] creating output.json file'));
        const arr = [];
        arr.push({
            name,
            quote
        });
        fs.writeFileSync('./output.json', JSON.stringify(arr));
        console.log(chalk.bgGreen.bold('[*] Data has been added!'));
    }else{
        const file = loadFile();
        const findDuplicate = file.find((data) => data.quote === quote && data.name === name);
        if(findDuplicate){
            console.log(chalk.red.inverse.bold('[!] Cannot add same author and quote'));
        }else{
            file.push({
                name,
                quote
            });
            fs.writeFileSync('./output.json', JSON.stringify(file));
            console.log(chalk.bgGreen.bold('[*] Data has been added!'));
        }
    }

    rl.close();
};

const listQuotes =  () => {
    const file = loadFile();

    console.log('[*] List of all quotes:')
    file.forEach((data, i) => {
        console.log(`${i+1}. ${data.quote} - ${data.name}`);
    });

    rl.close();
};

const findByAuthor = (name) => {
    const file = loadFile();
    const authorData = file.filter((data) => data.name.toLowerCase() === name.toLowerCase())

    if(authorData){
        console.log(`[*] List of quotes by ${name}:`)
        authorData.map((data, i) => {
            console.log(`${i+1}. ${data.quote} - ${data.name}`);
        });
    }else{
        console.log('No author found');
    }

    rl.close();
}

const removeQuote = (quote) => {
    const file = loadFile();
    const quoteData = file.filter((data) => data.quote.toLowerCase() !== quote.toLowerCase());

    if(file.length === quoteData.length){
        console.log(chalk.red.inverse.bold('[!] Quote not found'));
    }else{
        fs.writeFileSync('./output.json', JSON.stringify(quoteData));
        console.log(chalk.bgGreen.bold('[*] Quote has been deleted!'));
    }
    
    rl.close();
}

module.exports = {
    pertanyaan,
    saveData,
    listQuotes,
    findByAuthor,
    removeQuote
}