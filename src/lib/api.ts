export const getPdfJson = async (documentId: string) => {
  const res = await fetch(`/documents/${documentId}/${documentId}.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch PDF JSON");
  }

  return res.json();
};
