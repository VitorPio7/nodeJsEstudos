/*classe AppError extends a classe nativa Error para criar errors personalizados*/
// class Error {
//   constructor(message) {
//     this.name = 'Error'; // Nome do tipo de erro (pode ser sobrescrito)
//     this.message = message; // Mensagem passada ao erro
//     this.stack = ''; // Stack trace (geralmente é preenchido automaticamente)
//     // No Node.js, isso é feito automaticamente:
//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); /*chama o construtor da classe Error e define this.message*/
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    /*Crie uma stack trace para essa instância do erro,
     e ignore a chamada ao construtor atual (this.constructor) na stack */
    /*Error.captureStackTrace(targetObject, constructorOpt); */
    /*CaptureStackTrace serve para capturar manualmente a stack trace de um erro */
    /*O primeiro this aponta para o objeto atual, e segundo é a funcao que será excluida, normalmente é o this.constructor*/
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;