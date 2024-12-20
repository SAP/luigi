/** @type {import('rollup-plugin-svelte').Options} */
export default {
  compilerOptions: {
    customElement: true,
    // enable run-time checks when not in production
    dev: !process.env.ROLLUP_WATCH
  }
};
