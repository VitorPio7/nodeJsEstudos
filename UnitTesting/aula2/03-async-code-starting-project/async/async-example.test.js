import { it, expect } from "vitest";
import { generateToken } from "./async-example";

/*testa para ver se mostra o token */
it("should generate a token value", (done) => {
  const testUserEmail = "test@test.com";
  generateToken(testUserEmail, (err, token) => {
    // expect(token).toBeDefined();
    expect(token).toBe(2);
    done();
  });
});
