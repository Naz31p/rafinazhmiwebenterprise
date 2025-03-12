import process from 'process';

process.on('exit', (exitcode) => {
    console.info('Exit code nih: ${exitcode}');
});

console.info(process.version);
console.table(process.memoryUsage);
console.table(process.env);