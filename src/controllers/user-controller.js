const db = require("../models");
const { getFbUserOrCreate } = require("../utils/auth/firebase");

async function register(req, res, next) {
  const { email, password } = req.body;
  //if registered Firebase -> checkif registered Mongo -> return Document
  const fbUser = await getFbUserOrCreate(email, password).catch(next);
  let user = await db.User.findById(fbUser.uid)
    .lean()
    .exec()
    .catch(next);
  if (!user) {
    user = await db.User.create({ _id: fbUser.uid, ...req.body }).catch(next);
  }
  res.status(200).send({ data: user })
}

async function login(req, res, next) {
  const { uid } = req.user;
  const user = await db.User.findById(uid)
    .lean()
    .exec()
    .catch(next);
  if (!user) next({ statusCode: 404, message: "User not found." });
  else return res.status(200).send({ data: user });
}

async function deleteUser(req, res, next) {
  const { uid } = req.user
  await db.User.findByIdAndDelete(uid).catch(next);
  return res.status(202).send({ message: "User deleted", error: null })
}

async function update(req, res, next) {
  const { uid } = req.user;
  const { firstname, lastname } = req.body;

  const user = await db.User.findByIdAndUpdate(
    uid,
    { firstname, lastname },
    { new: true }
  )
    .lean()
    .exec()
    .catch(next);

  if (!user) next({ statusCode: 404, message: "User not found." });
  else res.status(200).send({ data: user });
}

module.exports = {
  register,
  login,
  deleteUser,
  update,
};
