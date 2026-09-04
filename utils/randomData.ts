export function randomEmail(): string {
  return `test_${Date.now()}@mail.com`;
}

export function getRandomIndex(count: number): number {
  return Math.floor(Math.random() * count);
}
