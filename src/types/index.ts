interface Usage {
  num_pages: number;
}

interface Chunk {
  content: string;
  embed: string | null;
  enriched: any | null;
  enrichment_success: boolean;
  blocks: Block[];
}

interface Block {
  type: string;
  bbox: Bbox;
  content: string;
}

interface Bbox {
  left: number;
  top: number;
  width: number;
  height: number;
  page: number;
}

interface Result {
  type: string;
  chunks: Chunk[];
}

interface PdfJson {
  usage: Usage;
  result: Result;
}
