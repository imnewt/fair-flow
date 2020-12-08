module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-flow-strip-types'], //(start reset-cache) fix issue undefined is not an object (evaluating 'this._callListeners.bind')
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": false }]
    // In contrast to MobX 4/5, "loose" must be false!
  ]
};
