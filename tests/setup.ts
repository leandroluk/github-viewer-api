// this is an example of setup
global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
} as unknown as Console;
