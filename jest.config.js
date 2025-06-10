module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|svg)$': 'identity-obj-proxy'
  }
};
