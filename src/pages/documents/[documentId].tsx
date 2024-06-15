import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useWindowSize } from "react-use";

const DynamicDocumentViewer = dynamic(
  () =>
    import("../../components/DocumentViewer").then((mod) => mod.DocumentViewer),
  {
    ssr: false,
  },
);

export default function DocumentPage() {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const { documentId } = router.query as { documentId: string };

  return <DynamicDocumentViewer documentId={documentId} width={width} />;
}
