import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isAddress, getAddress } from "viem";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logosDir = path.join(__dirname, "logos");

fs.readdir(logosDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(logosDir, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Error getting file stats: ${err}`);
        return;
      }

      if (stats.isDirectory()) {
        if (!isAddress(file, { strict: true })) {
          throw new Error(
            `${file} is not checksum encoded! Here's the encoded version: ${getAddress(
              file
            )}`
          );
        }
      }
    });
  });
});
