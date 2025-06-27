import { it, expect } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

/*testa para ver se mostra o token */
it("should generate a token value", (done) => {
  const testUserEmail = "test@test.com";
  generateToken(testUserEmail, (err, token) => {
    // expect(token).toBeDefined();
    try {
      expect(token).toBeDefined();
      done();
    } catch (error) {
      done(error);
    }
    // expect(token).toBe(2);
  });
});
it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";
  /*Vai verificar se essa variável não é undefined */
  const token = await generateTokenPromise(testUserEmail);
  return expect(token).toBeDefined();
});
