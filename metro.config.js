/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path");

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      "@shared": path.resolve(__dirname + "/../auto-cask-shared"),
    },
    nodeModulesPaths: [path.resolve(path.join(__dirname, "./node_modules"))],
  },
  watchFolders: [path.resolve(__dirname + "/../auto-cask-shared")],
};
