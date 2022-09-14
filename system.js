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
        const file = fs.readFileSync('./output.json', 'utf-8');
        const temp_arr = JSON.parse(file);

        const findDuplicate = temp_arr.find((data) => data.quote === quote && data.name === name);
        if(findDuplicate){
            console.log(chalk.red.inverse.bold('[!] Cannot add same author and quote'));
        }else{
            temp_arr.push({
                name,
                quote
            });
            fs.writeFileSync('./output.json', JSON.stringify(temp_arr));
            console.log(chalk.bgGreen.bold('[*] Data has been added!'));
        }
    }

    rl.close();
};

module.exports = {
    pertanyaan,
    saveData
}