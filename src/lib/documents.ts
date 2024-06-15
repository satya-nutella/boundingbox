import fs from "fs/promises";
import path from "path";

const documentsDirectory = path.join(process.cwd(), "public", "documents");

export const getDocuments = async () => {
  const documents = await fs.readdir(documentsDirectory);

  return documents;
};
