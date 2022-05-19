const path = require('path'),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '.')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),
    upload = multer({
        storage: storage
    }).any(),
    to = require('await-to-js').default,
    FileStorage = require('./helpers');

module.exports.upload = (req, useFileStorage = true) => {
    return new Promise((resolve, reject) => {
        upload(req, null, async () => {
            console.log('DATA RECEIVED', req.files)
            var files = req.files || req.file;
            if (!useFileStorage) {
                return resolve(files)
            }
            const options = {
                fileName: files[0].originalname,
                path: files[0].path,
                contentType: files[0].mimetype
            }
            const [err, file] = await to(FileStorage.write(options));
            err ? reject(err) : resolve(file.ETag ? file : { _id: options.path });
        });
    })
}

module.exports.uploadMultiple = (req, useFileStorage = true) => {
    return new Promise((resolve, reject) => {
        upload(req, null, async () => {
            console.log('DATA RECEIVED', req.files)
            var files = req.files || req.file;
            // if (error) {
            //     reject(error);
            // }
            if (!useFileStorage) {
                return resolve(files)
            }
            let result = [];
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    const options = {
                        fileName: files[i].originalname,
                        path: files[i].path,
                        contentType: files[i].mimetype,

                    }
                    const [err, file] = await to(FileStorage.write(options));
                    err ? reject(err) : file.ETag ? file : { _id: options.path };
                    if (file) {
                        file.name = files[i].originalname;
                        result.push(file);
                    }
                }
            }
            resolve(result);
        });
    })
}

module.exports.read = (id) => {
    return FileStorage.read(id);
}

module.exports.unlink = (id) => {
    return FileStorage.unlink(id);
}
module.exports.unlinkMultiple = (keys) => {
    let unlinkPromises = [];
    keys.forEach(key => {
        unlinkPromises.push(FileStorage.unlink(key));
    })
    return Promise.all(unlinkPromises);
}