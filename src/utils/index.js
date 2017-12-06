export function sendJSON(res, data = {}, code = 200) {
  return res.status(code).json(data);
}

export function sendError(res, err = {}, code = 400) {
  console.error('Error:', err);
  return res.status(code).json(err);
}