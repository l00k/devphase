#! /usr/bin/env ts-node-script

(async() => {
    const oclif = require('@oclif/core');
    
    oclif.run()
        .then(require('@oclif/core/flush'))
        .catch(require('@oclif/core/handle'))
    ;
})();
