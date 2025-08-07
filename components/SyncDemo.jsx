import { CodeBlock } from "@components/CodeBlock";

export function SyncDemo() {
  const codeExample = `import { LoroDoc } from "npm:loro-crdt";
const docA = new LoroDoc();
const docB = new LoroDoc();
docA.getText("text").update("Hello!");
docB.getText("text").update("Hi!");
const bytesA = docA.export({ mode: "update" });
const bytesB = docB.export({ mode: "update" });

// Exchange bytesA and bytesB via any methods
docB.import(bytesA);
docA.import(bytesB);

// The merge result is consistent
// They should both be "Hello!Hi!" or "Hi!Hello!"
console.log(docA.getText("text").toString()); 
console.log(docB.getText("text").toString());`;

  return (
    <section className="px-5 md:px-15 mt-10 z-10 relative">
      <h2 className="text-2xl not-italic font-semibold leading-[normal] bg-clip-text mb-4 bg-blue-green text-fill-transparent">
        Effortless Document Synchronization, <br/>
        Even in P2P Environments
      </h2>
      <CodeBlock>{codeExample}</CodeBlock>
    </section>
  );
}
