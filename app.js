const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input Name: ', (name) => {
    rl.question('Input Quote: ', (quote) => {
        if(fs.existsSync('./output.json') == false){
            const arr = [];
            arr.push({
                name,
                quote
            });
            fs.writeFileSync('./output.json', JSON.stringify(arr));
            console.log('Data has been added!');
        }else{
            const file = fs.readFileSync('./output.json', 'utf-8');
            const temp_arr = JSON.parse(file);
            temp_arr.push({
                name,
                quote
            });
            fs.writeFileSync('./output.json', JSON.stringify(temp_arr));
            console.log('Data has been added!');
        }

        rl.close();
    });
});