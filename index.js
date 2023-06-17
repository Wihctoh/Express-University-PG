require("dotenv").config();
const app = require("./src/app");

const port = process.env.PORT;

app.listen(3000, () => console.log(`server is running on port ${port}`));
