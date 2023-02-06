module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          '@screens': './src/components/screens',
          '@components': './src/components',
          '@hooks': './src/hooks',

          '@lib': './src/lib',
          '@utils': './src/lib/utils',
          '@ts': './src/lib/ts',
          '@enums': './src/lib/enums',
          '@constants': './src/lib/constants',

          '@config': './src/config',
          '@api': './src/api',

          '@images': './src/media/images',
          '@media': './src/media',

          '@src': './src',

          '@shared': '../auto-cask-shared',
        },
      },
    ],
  ],
};
