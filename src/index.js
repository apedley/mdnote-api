import app from './app';

const { PORT = 3727 } = process.env;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
