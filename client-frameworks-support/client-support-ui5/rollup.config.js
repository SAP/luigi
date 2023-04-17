import copy from 'rollup-plugin-copy';
export default {
  input: 'src/ui5-support-lib.js',
  output: {
    file: 'dist/ui5-support-lib.js',
    format: 'es',
    compact: true
  },
  plugins: [
    copy({
      targets: [{ src: 'src/README.md', dest: 'dist' }]
    })
  ]
};
