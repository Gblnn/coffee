//e2e.test.js
const run = require('./run');
describe('e2e test urlpilgrim', () => {
test('prints error and help message when no arguments given', async () => {
const { stderr, stdout, exitCode } = await run();
expect(exitCode).toBe(0);
expect(stdout).toMatchSnapshot();
expect(stderr).toEqual('');
});
})