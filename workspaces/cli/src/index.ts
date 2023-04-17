#!/usr/bin/env node

(async() => {
    const TsNode = require('ts-node');
    const tsNodeService = TsNode.register({
        transpileOnly: true,
    });

    const oclif = require('@oclif/core');
    oclif.run()
        .then(require('@oclif/core/flush'))
        .catch(require('@oclif/core/handle'))
    ;
})();
