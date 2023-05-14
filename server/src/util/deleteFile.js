const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
      return;
    }
    console.log("File deleted successfully");
  });
};

module.exports = {
  deleteFile,
};
