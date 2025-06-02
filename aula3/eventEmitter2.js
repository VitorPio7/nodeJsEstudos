const EventEmitter = require('events');
const meuEmissor = new EventEmitter();

// Registrando um ouvinte (listener) para o evento 'mensagem'
meuEmissor.on('mensagem', (msg) => {
  console.log('Mensagem recebida:', msg);
});

// Emitindo o evento 'mensagem'
meuEmissor.emit('mensagem', 'Olá, mundo!');