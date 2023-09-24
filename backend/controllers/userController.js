const User = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../utils/appError");
const createOneUser = factory.createOne(User);

const multerStorage = multer.memoryStorage(); // when you image processing before saving to disk, you should use memoryStorage() instead of diskStorage() because you can access to the image as buffer in memoryStorage() but you can't in diskStorage() file name is not get set in memoryStorage() so you should set file name in resizeUserPhoto middleware

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // 画像のみをアップロードするようにする
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo"); // 画像をアップロードするときは、upload.single('photo')を追加する'photo'はフロント側で指定した名前 これでreq.fileに画像の情報が入る

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next(); // 画像がない場合は次のミドルウェアに移動する
  req.file.filename = `user-${req.id}-${Date.now()}.jpeg`; // 画像の名前を決める
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`); //toFile()はファイルを保存する この時、req.file.bufferは画像のデータを含んでいる 画像のデータをリサイズして、jpeg形式に変換して、qualityを90%にして、ファイルを保存する
  next();
};

exports.register = catchAsync(async (req, res, next) => {

  if (req.file && req.file.filename) {
    req.body.profile_image = `/img/users/${req.file.filename}`;
  }

  await createOneUser(req, res, next);
});

exports.getUser = factory.getOne(User);