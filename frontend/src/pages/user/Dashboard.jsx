import { useState, useRef, useCallback, useEffect } from "react";
import {useDocStore} from '@/store/useDocStore'
// ============================================================
//  ICONS — inline SVG so the component stays self-contained
// ============================================================
const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);
const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
    <line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);
const UnderlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
    <path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" y1="20" x2="20" y2="20" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
// const GetTextIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
//   </svg>
// );

// ============================================================
//  TOOLBAR BUTTON — reusable atom
// ============================================================
/**
 * ToolbarButton
 * @param {object}   props
 * @param {function} props.onClick   - handler
 * @param {boolean}  [props.active]  - highlights the button when the format is active
 * @param {string}   props.title     - tooltip text
 * @param {string}   [props.variant] - "default" | "danger" | "accent"
 * @param {node}     props.children
 */
const ToolbarButton = ({ onClick, active = false, title, variant = "default", children }) => {
  const [pressed, setPressed] = useState(false);

  const base =
    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

  const variants = {
    default: active
      ? "bg-stone-800 text-amber-300 shadow-inner"
      : "bg-stone-700/60 text-stone-300 hover:bg-stone-700 hover:text-white",
    danger:
      "bg-stone-700/60 text-rose-400 hover:bg-rose-900/50 hover:text-rose-300",
    accent:
      "bg-amber-500 text-stone-900 hover:bg-amber-400 shadow-md shadow-amber-900/40",
  };

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault(); // keeps editor focus
        setPressed(true);
        onClick(e);
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      title={title}
      aria-label={title}
      aria-pressed={active}
      style={{ transform: pressed ? "scale(0.93)" : "scale(1)" }}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

// ============================================================
//  TOAST NOTIFICATION — ephemeral feedback
// ============================================================
const Toast = ({ message, visible }) => (
  <div
    className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateX(-50%) translateY(${visible ? 0 : "8px"})`,
      transition: "opacity 0.25s ease, transform 0.25s ease",
    }}
  >
    <div className="bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full shadow-xl tracking-wide">
      {message}
    </div>
  </div>
);

// ============================================================
//  MAIN COMPONENT: TextEditor
// ============================================================
/**
 * TextEditor — self-contained rich-text editor component.
 *
 * Props:
 * @param {string}   [placeholder]     - Placeholder text shown when editor is empty.
 * @param {function} [onGetText]       - Callback fired when the user clicks "Get Text".
 *                                       Receives { html, plainText } as argument.
 * @param {string}   [initialContent]  - Optional HTML string to pre-populate the editor.
 * @param {string}   [className]       - Extra classes for the outer wrapper.
 * @param {number}   [minHeight=220]   - Minimum height of the editable area in px.
 *
 * Usage:
 *   <TextEditor
 *     placeholder="Start writing…"
 *     onGetText={({ html, plainText }) => console.log(plainText)}
 *   />
 */
const TextEditor = ({
  placeholder = "Start writing something brilliant…",
  onGetText,
  initialContent = "",
  className = "",
  minHeight = 220,
}) => {
  const setData = useDocStore((state)=>state.setData);
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });
  const [isEmpty, setIsEmpty] = useState(!initialContent);
  const [toast, setToast] = useState({ message: "", visible: false });
  const toastTimer = useRef(null);
  const data = useDocStore((state)=>state.data); 
  // ── Initialise content ──────────────────────────────────────
useEffect(() =>{
  if (editorRef.current && data) {
    editorRef.current.innerHTML = data;
    setIsEmpty(false);
  }
}, [data]);

  // ── Show a transient toast message ──────────────────────────
  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }, []);

  // ── Sync toolbar active-state with current selection ────────
  const syncFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  }, []);

  // ── Track emptiness for placeholder visibility ───────────────
const handleInput = useCallback(() => {
  const el = editorRef.current;
  if (!el) return;

  const text = el.innerText;
  setData(text); // save editor text to Zustand

  const trimmed = text.trim();
  setIsEmpty(trimmed === "" || el.innerHTML === "<br>");
  syncFormats();
}, [syncFormats, setData]);

  // ── execCommand wrapper (keeps focus in editor) ──────────────
  const execFormat = useCallback((command) => {
    editorRef.current?.focus();
    document.execCommand(command, false, null);
    syncFormats();
  }, [syncFormats]);

  // ── Clear all content ────────────────────────────────────────
  const handleClear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setIsEmpty(true);
      syncFormats();
      editorRef.current.focus();
      showToast("Editor cleared");
    }
  }, [syncFormats, showToast]);

  // ── Copy plain text to clipboard ─────────────────────────────
  const handleCopy = useCallback(async () => {
    const text = editorRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard ✓");
    } catch {
      showToast("Copy failed — check permissions");
    }
  }, [showToast]);

  // ── Return content to parent via callback ────────────────────
//   const handleGetText = useCallback(() => {
//     const html = editorRef.current?.innerHTML ?? "";
//     const plainText = editorRef.current?.innerText ?? "";
//     if (onGetText) onGetText({ html, plainText });
//     showToast("Text retrieved ✓");
//   }, [onGetText, showToast]);

  // ── Word & character count ───────────────────────────────────
  const [stats, setStats] = useState({ words: 0, chars: 0 });
  const updateStats = useCallback(() => {
    const text = editorRef.current?.innerText ?? "";
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    setStats({ words, chars: text.replace(/\n/g, "").length });
  }, []);

  const handleKeyUp = useCallback(() => {
    syncFormats();
    updateStats();
  }, [syncFormats, updateStats]);

  // ──────────────────────────────────────────────────────────────
  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden shadow-2xl ${className}`}
      style={{
        background: "linear-gradient(145deg, #1c1917, #141210)",
        border: "1px solid rgba(245,158,11,0.18)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-700/60"
        style={{ background: "rgba(0,0,0,0.25)" }}
      >
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#d97706", fontFamily: "monospace" }}
        >
          ✦ Editor
        </span>
        <div className="ml-auto flex items-center gap-1.5 text-stone-500 text-xs" style={{ fontFamily: "monospace" }}>
          <span>{stats.words} words</span>
          <span className="opacity-40">·</span>
          <span>{stats.chars} chars</span>
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────────── */}
      <div
        className="flex flex-wrap items-center gap-1.5 px-3 py-2.5 border-b border-stone-700/40"
        style={{ background: "rgba(0,0,0,0.15)" }}
      >
        {/* Format group */}
        <div className="flex items-center gap-1 mr-2">
          <ToolbarButton onClick={() => execFormat("bold")} active={activeFormats.bold} title="Bold (Ctrl+B)">
            <BoldIcon /> <span>Bold</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => execFormat("italic")} active={activeFormats.italic} title="Italic (Ctrl+I)">
            <ItalicIcon /> <span>Italic</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => execFormat("underline")} active={activeFormats.underline} title="Underline (Ctrl+U)">
            <UnderlineIcon /> <span>Underline</span>
          </ToolbarButton>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stone-600/60 mx-1" />

        {/* Utility group */}
        <div className="flex items-center gap-1">
          <ToolbarButton onClick={handleCopy} title="Copy plain text to clipboard" variant="default">
            <CopyIcon /> <span>Copy</span>
          </ToolbarButton>
          <ToolbarButton onClick={handleClear} title="Clear all content" variant="danger">
            <TrashIcon /> <span>Clear</span>
          </ToolbarButton>
        </div>

        {/* Divider */}
        {/* <div className="w-px h-5 bg-stone-600/60 mx-1" /> */}

        {/* Get Text — accent CTA */}
        {/* <ToolbarButton onClick={handleGetText} title="Send current text to parent component" variant="accent">
          <GetTextIcon /> <span>Get Text</span>
        </ToolbarButton> */}
      </div>

      {/* ── Editable area ──────────────────────────────────── */}
      <div className="relative flex-1">
        {/* Placeholder */}
        {isEmpty && (
          <div
            className="absolute inset-0 px-5 py-4 text-stone-500 pointer-events-none select-none"
            style={{ fontStyle: "italic", fontSize: "0.95rem", lineHeight: "1.8" }}
            aria-hidden="true"
          >
            {placeholder}
          </div>
        )}

        {/*
          contentEditable div — the actual editor surface.
          Uses execCommand for formatting (broad browser support for rich-text editing).
        */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          spellCheck
          onInput={handleInput}
          onKeyUp={handleKeyUp}
          onMouseUp={syncFormats}
          onSelect={syncFormats}
          aria-multiline="true"
          aria-label="Text editor"
          role="textbox"
          style={{
            minHeight: `${minHeight}px`,
            padding: "1rem 1.25rem",
            outline: "none",
            color: "#e7e5e4",
            fontSize: "0.975rem",
            lineHeight: "1.85",
            caretColor: "#f59e0b",
            wordBreak: "break-word",
          }}
        />
      </div>

      {/* ── Footer hint ────────────────────────────────────── */}
      <div
        className="px-4 py-2 text-stone-600 text-xs border-t border-stone-700/40 flex items-center gap-3"
        style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.2)" }}
      >
        <span>Ctrl+B bold</span>
        <span className="opacity-40">·</span>
        <span>Ctrl+I italic</span>
        <span className="opacity-40">·</span>
        <span>Ctrl+U underline</span>
      </div>

      {/* ── Toast ──────────────────────────────────────────── */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
};

// ============================================================
//  DEMO / EXAMPLE — shows how to consume the TextEditor
// ============================================================
/**
 * ParentDemo
 * This is a minimal example of how to drop <TextEditor> into any
 * component and retrieve the current content via onGetText callback.
 */

export default TextEditor