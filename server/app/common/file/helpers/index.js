const useGridFS = require('./gridfs');
// const useS3 = require('../../../../services/s3');

// module.exports = global.CONFIG.fileStorage.storage === 's3' ? useS3 : useGridFS;
module.exports = useGridFS;