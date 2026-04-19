import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TextEditor = ({ initialContent = '', onChange, readOnly = false }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || '<p></p>',
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(initialContent || '<p></p>')
  }, [editor, initialContent])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(!readOnly)
  }, [editor, readOnly])

  return (
    <div className="h-full min-h-[300px] rounded-xl border border-gray-200 bg-white shadow-sm">
      <EditorContent editor={editor} className="min-h-[300px] p-4 focus:outline-none" />
    </div>
  )
}

export default TextEditor