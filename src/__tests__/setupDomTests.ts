
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query:any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  })
});

test('demo', () => {
  expect(true).toBe(true)
})