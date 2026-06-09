const { spawnSync } = require('child_process');
const path = 'src/calculator.js';

function runCmd(args) {
  const res = spawnSync('node', [path, ...args], { encoding: 'utf8' });
  return res;
}

describe('CLI calculator (add, sub, mul, div)', () => {
  test('add 2 3 => 5', () => {
    const r = runCmd(['add', '2', '3']);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('5');
  });

  test('sub 10 4 => 6', () => {
    const r = runCmd(['sub', '10', '4']);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('6');
  });

  test('mul 45 2 => 90', () => {
    const r = runCmd(['mul', '45', '2']);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('90');
  });

  test('div 20 5 => 4', () => {
    const r = runCmd(['div', '20', '5']);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('4');
  });

  test('division by zero returns error', () => {
    const r = runCmd(['div', '10', '0']);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/division by zero/i);
  });

  test('invalid operand returns error', () => {
    const r = runCmd(['add', '2', 'x']);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/operands.*valid numbers/i);
  });

  test('unknown operation returns error', () => {
    const r = runCmd(['pow', '2', '3']);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/unknown operation/i);
  });
});
