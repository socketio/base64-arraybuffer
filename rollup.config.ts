import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

const banner = `/*
 * ${pkg.name} ${pkg.version} <${pkg.homepage}>
 * Copyright (c) ${(new Date()).getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

// transform "../../src/index.ts" (invalid) into "../src/index.ts"
const sourcemapPathTransform = (sourcePath) => {
    return sourcePath.substring('../'.length);
};

export default {
    input: `src/index.ts`,
    output: [
        {
            file: pkg.main,
            name: pkg.name,
            format: 'umd',
            banner,
            sourcemap: true,
            sourcemapPathTransform,
        },
        {
            file: pkg.module,
            format: 'esm',
            banner,
            sourcemap: true,
            sourcemapPathTransform,
        },
    ],
    external: [],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
        // Allow json resolution
        json(),
        // Compile TypeScript files
        typescript(),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),

        // Resolve source maps to the original source
        sourceMaps(),
    ],
}
