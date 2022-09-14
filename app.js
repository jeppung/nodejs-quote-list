const {pertanyaan,saveData} = require('./system');

const main = async () => {
    const name = await pertanyaan('Input Name');
    const quote = await pertanyaan('Input Quote');

    saveData(name, quote);
};

main();