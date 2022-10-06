import fs from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';
import baseConfig from './jest.config.js';


const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json'));
const moduleNameMapper = pathsToModuleNameMapper(
    {
        '@/*': [ './src/*' ]
    },
    { prefix: '<rootDir>', useESM: true }
);


/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    ...baseConfig,
    moduleNameMapper
};

export default config;
