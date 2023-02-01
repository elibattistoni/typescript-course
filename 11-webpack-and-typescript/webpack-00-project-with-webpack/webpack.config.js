//! NodeJS environment
//! NB webpack uses NodeJS to execute your files

const path = require("path");

module.exports = {
  entry: "./src/app.ts", //! which file the entire project starts (i.e. the entry point)
  //! NB to make webpack work correctly, from all the .ts files where you import other files, you should remove .js
  output: {
    filename: "bundle.js", //! this will be the single JS file that will be procuded in the end
    //! NB you can also have a dynamic path like "bundle.[contentHash].js" --> this tells webpack to automatically create a unique hash for every build (which can help you with caching in the browser)
    path: path.resolve(__dirname, "dist"), //! this should match the path that you defined for outDir in your tsconfig.json file
    publicPath: "dist",
  },

  devtool: "inline-source-map", //! this relates to sourceMpa true in tsconfig.json
  module: {
    rules: [
      {
        test: /\.ts$/, //! i.e. any file that ends with .ts should be handled by this rule
        use: "ts-loader", //! should be handled by ts-loader
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], //! tell webpack that it should look for both .ts and .js files --> look for all these files and bundle them together
  },
};

//! NB a loader is just a package that tells webpack how to deal with certain files
