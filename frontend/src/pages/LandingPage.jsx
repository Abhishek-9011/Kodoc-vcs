import AppLogo from "@/components/AppLogo";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #f0f0f0 0%, #e8e8e8 60%, #d8d8d8 100%)",
      }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #aaa 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* version timeline decoration */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-0 select-none">
        {["v4", "v3", "v2", "v1"].map((v, i) => (
          <div key={v} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                i === 0
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {v}
            </div>
            {i < 3 && <div className="w-px h-8 bg-gray-300" />}
          </div>
        ))}
      </div>

      <AppLogo />

      <div className="relative z-10 text-center mt-10 md:mt-16 max-w-3xl">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6 border border-gray-300 rounded-full px-4 py-1 bg-white/60">
          Version control · for documents
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
          Every edit, every draft,
        </h1>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-400 leading-tight mt-1">
          forever preserved.
        </h2>
        <p className="mt-6 text-gray-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Write and edit documents like normal — but every save creates a permanent snapshot. Roll back, compare, and restore any version, any time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-full font-semibold text-sm hover:bg-gray-700 transition-colors">
            Start writing for free
          </Link>
          <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold text-sm hover:bg-white transition-colors">
            See version history demo
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-400">No credit card. Free forever for personal use.</p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gray-400" />
      </div>
    </section>
  );
}

/* ─── Features ───────────────────────────────────────────────────────── */
const features = [
  {
    icon: "🕰️",
    title: "Infinite version history",
    description:
      "Every save is a checkpoint. Your entire edit history is stored automatically — no manual commits needed.",
  },
  {
    icon: "↩️",
    title: "One-click restore",
    description:
      "Found a better draft from three days ago? Restore any previous version instantly without losing your current work.",
  },
  {
    icon: "🔍",
    title: "Side-by-side diff viewer",
    description:
      "Compare any two versions side by side with character-level highlighting so you see exactly what changed.",
  },
  {
    icon: "✏️",
    title: "Rich document editor",
    description:
      "A clean, distraction-free editor with rich text formatting — headings, lists, tables, code blocks, and more.",
  },
  {
    icon: "🏷️",
    title: "Named milestones",
    description:
      "Tag important versions with labels like 'Final Draft' or 'Client Review' to navigate your history at a glance.",
  },
  {
    icon: "🔗",
    title: "Shareable version links",
    description:
      "Share a link to any specific version of a document — perfect for reviews, approvals, and audit trails.",
  },
];

function Features() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Git for your documents
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            All the power of version control — none of the terminal commands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-gray-50"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Create a document",
    description:
      "Start a new document and write freely in our rich text editor — just like any writing tool you already know.",
  },
  {
    number: "02",
    title: "Edit and save",
    description:
      "Every time you hit save, a new version snapshot is captured automatically in the background.",
  },
  {
    number: "03",
    title: "Browse your timeline",
    description:
      "Open the version timeline to see every save — with timestamps, word counts, and a preview of changes.",
  },
  {
    number: "04",
    title: "Restore or compare",
    description:
      "Jump back to any version, compare two snapshots side by side, or branch off from an older draft.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            How it works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 tracking-tight">
            Save normally. Travel freely.
          </h2>
          <p className="mt-4 text-gray-400 max-w-sm mx-auto text-sm">
            No new habits to build. Your writing workflow stays exactly the same.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400 tracking-wider">{step.number}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mini timeline visual */}
        <div className="mt-16 p-6 rounded-2xl bg-gray-900 border border-gray-800">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
            Version timeline · Project Proposal.docx
          </p>
          <div className="space-y-3">
            {[
              { label: "v6 — Today, 4:32 PM", note: "Final edits before submission", active: true },
              { label: "v5 — Today, 2:14 PM", note: "Added executive summary" },
              { label: "v4 — Yesterday, 11:40 AM", note: "Rewrote introduction" },
              { label: "v3 — Yesterday, 9:05 AM", note: "Tagged: 'Client Draft'" },
              { label: "v2 — Mon, 6:22 PM", note: "Added budget table" },
              { label: "v1 — Mon, 3:00 PM", note: "Initial document created" },
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    v.active ? "bg-white" : "bg-gray-600"
                  }`}
                />
                <span className={`text-sm font-medium ${v.active ? "text-white" : "text-gray-500"}`}>
                  {v.label}
                </span>
                <span className="text-xs text-gray-600 ml-1">— {v.note}</span>
                {v.active && (
                  <span className="ml-auto text-xs bg-gray-700 text-gray-300 rounded px-2 py-0.5">
                    current
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Use Cases ──────────────────────────────────────────────────────── */
const useCases = [
  {
    title: "Writers & novelists",
    description:
      "Never lose a chapter you deleted. Keep every draft of your manuscript and track how your story evolved from first idea to final page.",
    tag: "Creative writing",
  },
  {
    title: "Legal & compliance teams",
    description:
      "Maintain an immutable audit trail of every contract and policy change — who saved what, and when.",
    tag: "Legal & compliance",
  },
  {
    title: "Students & researchers",
    description:
      "Track how your thesis or research paper evolved. Revisit abandoned arguments or recover deleted citations effortlessly.",
    tag: "Academia",
  },
  {
    title: "Product & design teams",
    description:
      "Keep specs, PRDs, and briefs versioned. See exactly how requirements changed from kickoff to launch.",
    tag: "Product teams",
  },
];

function UseCases() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Use cases
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Built for every writer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {useCases.map((u) => (
            <div
              key={u.title}
              className="p-7 rounded-2xl border border-gray-100 bg-gray-50 hover:border-gray-300 transition-all"
            >
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {u.tag}
              </span>
              <h3 className="font-bold text-gray-900 text-xl mt-2 mb-2">{u.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{u.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── CTA ────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <div className="flex justify-center items-center  mb-3" >
      <section className="py-24 px-4 bg-gray-950 rounded-md w-[90%] ">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Your next great draft
          <br />
          <span className="text-gray-400">is already in there somewhere.</span>
        </h2>
        <p className="mt-5 text-gray-400 text-base">
          Start writing with a safety net. Every version, saved forever.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
            Create your first document
          </button>
          <button className="px-8 py-3 border border-gray-700 text-gray-300 rounded-full font-semibold text-sm hover:border-gray-500 transition-colors">
            View pricing
          </button>
        </div>
        <p className="mt-4 text-xs text-gray-600">Free forever for personal use. No credit card needed.</p>
      </div>
    </section>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
const footerLinks = {
  Product: ["Editor", "Version History", "Diff Viewer", "Milestones", "Pricing"],
  Resources: ["Documentation", "Changelog", "API", "Status", "Blog"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-4 pt-16 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-white font-black text-xl tracking-tight mb-3">Docrev</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Version control for the documents that matter most.
            </p>
            <div className="flex gap-3 mt-5">
              {["𝕏", "in", "gh"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full border border-gray-700 text-gray-400 text-xs hover:border-gray-500 hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-white text-xs font-semibold tracking-widest uppercase mb-4">
                {title}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 text-sm hover:text-gray-200 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Docrev. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">Every word, every version — forever.</p>
        </div>
      </div>
    </footer>
  );
}
export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        body { font-family: 'DM Sans', 'Inter', system-ui, sans-serif; }
      `}</style>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
}
