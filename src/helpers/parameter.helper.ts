export class Parameter {
  static id(): string {
    return `:id([0-f]{8}-[0-f]{4}-[0-f]{4}-[0-f]{4}-[0-f]{12}|me)`;
  }
}
