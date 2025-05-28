/*funcao para diminuir a quantidade repetitiva do try/catch no código*/
module.exports = fn => {
  return (req, res, next) => {/*retorna uma nova função middleware */
    fn(req, res, next).catch(err => next(err));
  };
};