import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  external: [
    'react',
    'react-dom'
  ],
  input: 'src/index.jsx',
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV,
      delimiters: ['', '']
    })
  ],
  output: [{
    file: 'dist/Editdown.js',
    format: 'umd',
    name: 'Editdown',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }, {
    plugins: [terser()],
    file: 'dist/Editdown.min.js',
    format: 'umd',
    name: 'Editdown',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }]
}
