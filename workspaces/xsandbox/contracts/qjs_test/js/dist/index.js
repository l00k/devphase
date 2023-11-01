(function() {
    console.log('It works!');
    console.log(JSON.stringify(scriptArgs));
    
    return JSON.stringify([ 'example_result', scriptArgs ]);
})();
