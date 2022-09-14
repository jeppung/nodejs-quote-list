const fs = require('fs');
const readline = require('readline');

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

const main = async () => {
    const name = await pertanyaan('Input Name');
    const quote = await pertanyaan('Input Quote');

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
};

main();