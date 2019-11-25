module.exports = {
  devServer: {
    // because of 404 issue, which redirected us to sampleapp.html instead of index.html
    historyApiFallback: true
  }
};
