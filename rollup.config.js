import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const entry = path.resolve(__dirname, './src/index.js');
const production = !process.env.ROLLUP_WATCH;

module.exports = [
  {
    input: entry,
    output: {
      file: path.resolve(__dirname, './dist/vCenter.js'),
      format: 'umd',
      name: 'vCenter',
      source: true,
    },
    plugins: [
      resolve(),
      common(),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      production && uglify()
    ]
  }
];