import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getDocuments } from "@/lib/documents";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  documents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className={`p-3 space-y-3 ${inter.className}`}>
      <h2 className="text-3xl font-semibold">Documents</h2>
      <ul>
        {documents.map((document) => (
          <li key={document}>
            <Link
              href={`/documents/${document}`}
              className="hover:underline cursor-pointer"
            >
              {document}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps = (async () => {
  const documents = await getDocuments();

  return { props: { documents } };
}) satisfies GetServerSideProps<{ documents: string[] }>;
