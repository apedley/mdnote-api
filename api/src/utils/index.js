import bcrypt from 'bcryptjs';

export function sendJSON(res, data = {}, code = 200) {
  return res.status(code).json(data);
}

export function sendError(res, err = {}, code = 400) {
  console.error(err);
  return res.status(code).json(err);
}

export function compareLocalPassword(inputPassword, databasePassword) {
  return bcrypt.compareSync(inputPassword, databasePassword);
}
