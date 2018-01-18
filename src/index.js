import app from './app';

const { PORT = 2052 } = process.env;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
