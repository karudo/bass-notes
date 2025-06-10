module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|svg)$': 'identity-obj-proxy'
  }
};
