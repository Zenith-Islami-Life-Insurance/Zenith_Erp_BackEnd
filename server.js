const app = require("./app");
const getDBConnection = require("./utils/ConnectOracle");


// Oracle database connection
getDBConnection()
  .then(() => {
    console.log("Connected to Oracle server");
  })
  .catch((err) => {
    console.error("Error connecting to Oracle:", err);
    process.exit(1); // Exit process if DB connection fails
  })
  .finally(() => {
    console.log("Database connection attempt complete");
  });

// Server port connection
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`App is running on port http://localhost:${port}`);
});