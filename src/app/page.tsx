import Docs from "../../README.md";
import rehypePrettyCode from 'rehype-pretty-code';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between items-center p-12 bg-[#171717]">
      <section className="prose prose-invert max-w-[80ch]">
        <Docs />
      </section>
    </main>
  );
}
