import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/cli/index.ts',
        'src/etc/**'
    ],
    dts: true,
    format: [ 'cjs' ],
    target: 'node16',
    splitting: false,
    clean: true,
    tsconfig: 'tsconfig.build.json'
});
