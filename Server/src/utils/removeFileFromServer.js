import fs from "fs";
import path from "path";

// Function to remove file
export const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error while deleting the file: ${filePath}`, err);
    } else {
      console.log(`Successfully deleted the file: ${filePath}`);
    }
  });
};
