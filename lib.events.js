import { EventEmitter } from 'events';

const emitter = new EventEmitter();
emitter.on('send_email', (email_address)=>{
    console.info(`Email berhasil dikirim ke alamat:  ${email_address}`);
})

function forgotPassword(){
    console.log('Start Forgot Password Process');
    emitter.emit('send_email', 'rafi@gmail.com');
}

forgotPassword();