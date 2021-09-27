const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#f99000",
              "@border-radius": "0",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
