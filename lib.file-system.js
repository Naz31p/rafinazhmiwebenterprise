import { readFile, writeFile} from'fs/promises';

async function extractFile(){
    try{
    const file = await readFile('data.txt', 'utf8');
    console.info(file);
    } catch (err) {
        console.error(err);
    }
}

async function writeToFile(){
    try{
        await writeFile('output.txt', 'Hello NodeJS filesystem');
        console.info('File written');
    } catch (err) {
        console.error(err);
    }
}

extractFile();
writeToFile();