export class UserJwtInvalidError extends Error {
  constructor() {
    super("O token está inválido")
  }
}