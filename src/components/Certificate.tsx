import { useRef, useState } from "react";
import { Award, Download } from "lucide-react";
import { GitHubMark } from "./GitHubMark";

type Html2PdfWorker = {
  set: (options: object) => {
    from: (element: HTMLElement) => { save: () => Promise<void> };
  };
};

declare global {
  interface Window {
    html2pdf?: () => Html2PdfWorker;
  }
}

type CertificateProps = {
  userName: string;
  onRestart: () => void;
};

export function Certificate({ userName, onRestart }: CertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [issuedDate] = useState(() => new Date().toLocaleDateString());
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (!window.html2pdf) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load html2pdf"));
          document.head.appendChild(script);
        });
      }

      const element = certRef.current;
      if (!element || !window.html2pdf) {
        throw new Error("Certificate renderer is not ready");
      }

      const options = {
        margin: 0.5,
        filename: "Git_Master_Academy_Certificate.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#0d1117" },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };

      await window.html2pdf().set(options).from(element).save();
    } catch (err) {
      console.error("Failed to generate PDF", err);
      alert("Failed to generate PDF. Falling back to browser print.");
      window.print();
    }
    setIsDownloading(false);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="animate-fade-in-up w-full max-w-4xl overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] shadow-[0_0_50px_rgba(31,111,235,0.2)]">
        <div ref={certRef} className="bg-[#0d1117]">
          <div className="relative border-b border-[#30363d] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f6feb]/20 via-[#0d1117] to-[#0d1117] p-12 text-center">
            <Award
              size={80}
              className="mx-auto mb-6 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            />
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Certificate of Mastery
            </h1>
            <p className="text-xl text-gray-400">This certifies that</p>
            <h2 className="my-6 inline-block border-b-2 border-[#1f6feb]/30 px-8 pb-2 text-3xl font-bold text-[#58a6ff] italic md:text-4xl">
              {userName || "Git Master"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Has successfully completed the comprehensive Git & GitHub CLI
              curriculum, mastering fundamental and advanced version control
              workflows, branching strategies, and repository management.
            </p>
          </div>

          <div className="flex flex-col items-center justify-between space-y-4 bg-[#161b22] p-8 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-4 text-left">
              <GitHubMark size={32} className="text-[#8b949e]" />
              <div>
                <p className="text-sm tracking-wider text-gray-500 uppercase">
                  Issued Date
                </p>
                <p className="font-mono text-lg text-white">
                  {issuedDate}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm tracking-wider text-gray-500 uppercase">
                Authority
              </p>
              <p className="font-mono text-lg font-bold text-white">
                Git Master Academy
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 border-t border-[#30363d] bg-[#010409] p-6">
          <button
            onClick={onRestart}
            className="rounded-lg border border-[#30363d] bg-[#21262d] px-6 py-2 font-medium text-white transition hover:bg-[#30363d]"
          >
            Review Course
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center rounded-lg bg-[#238636] px-6 py-2 font-medium text-white transition hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={18} className="mr-2" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
