const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/png", "image/jpg"],
        1000000,
        "Only .jpg, jpeg or .png format allowed!",
    );

    // call the middleware function
    // confusion #32 - 15:42
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = avatarUpload;
