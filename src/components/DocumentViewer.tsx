import { Document, Page, pdfjs } from "react-pdf";
import { useMemo, useRef, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "@/components/ui/Button";
import { getPdfJson } from "@/lib/api";
import { BoundingBox } from "@/components/ui/BoundingBox";

if (typeof window !== "undefined") {
  const workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
}

export function DocumentViewer({
  documentId,
  width,
  height,
}: {
  documentId: string;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [documentJson, setDocumentJson] = useState<PdfJson>();

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    const pdfJson = await getPdfJson(documentId);

    setDocumentJson(pdfJson);
    setNumPages(numPages);
    setLoading(false);
  };

  const boundingBoxesForPage: Array<Bbox & Pick<Block, "type">> =
    useMemo(() => {
      if (!documentJson) {
        return [];
      }

      return documentJson.result.chunks
        .flatMap((chunk) =>
          chunk.blocks
            .filter((block) => block.bbox.page === pageNumber)
            .map((block) => ({
              ...block.bbox,
              type: block.type,
            })),
        )
        .map(({ left, top, width, height, type }) => ({
          left: left * 100,
          top: top * 100,
          width: width * 100,
          height: height * 100,
          page: pageNumber,
          type,
        }));
    }, [pageNumber, documentJson]);

  console.log(boundingBoxesForPage);

  return (
    <div className="min-h-full max-h-full overflow-y-auto">
      <div className="relative">
        {boundingBoxesForPage.map((bbox, index) => (
          <BoundingBox bbox={bbox} type={bbox.type} key={index} />
        ))}

        <Document
          file={`/documents/${documentId}/${documentId}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            canvasRef={canvasRef}
            width={width}
            height={height}
          />
        </Document>
      </div>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/4 flex gap-2 z-20">
        <Button
          type="button"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (numPages && pageNumber < numPages) {
              setPageNumber(pageNumber + 1);
            }
          }}
          disabled={pageNumber === numPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
