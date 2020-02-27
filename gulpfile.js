(() => {

    'use strict';

    const

        // Modules
        { parallel } = require('gulp'),
        del = require('del');

    (async (done) => {
        await del(['**/.DS_Store'], done);
    })();

    function execution_time (done) {
        let timeStart = process.hrtime();

        process.on('exit', (code) => {
            let timeEnd = process.hrtime(timeStart);

            console.info('Execution time: %ds %dms', timeEnd[0], timeEnd[1] / 1000000);
        });

        done();
    }

    function default_function (done) {

        // Code here

        done();
    }

    exports.default = parallel(execution_time, default_function);

})();
