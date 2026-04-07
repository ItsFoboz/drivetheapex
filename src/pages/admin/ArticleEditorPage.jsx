import React, { useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapLink from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  Quote, Link as LinkIcon, Image as ImageIcon,
  List, ListOrdered, Eye, Save, Globe
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'
import { MOCK_ARTICLES } from '@/lib/mockData'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 4,
        background: active ? 'rgba(206,79,55,0.15)' : 'transparent',
        color: active ? 'var(--dta-red)' : 'var(--dta-muted)',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 150ms ease-out, color 150ms ease-out',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--dta-white)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--dta-muted)' }}
    >
      {children}
    </button>
  )
}

const inputStyle = {
  background: 'var(--dta-surface)',
  border: '1px solid var(--dta-border)',
  borderRadius: 4,
  padding: '9px 12px',
  fontFamily: 'Inter',
  fontSize: 13,
  color: 'var(--dta-white)',
  width: '100%',
  outline: 'none',
  transition: 'border-color 150ms ease-out',
}

const CATEGORIES = ['Formula 1', 'Analysis', 'Culture', 'Cars', 'News']

export default function ArticleEditorPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isNew = !slug || slug === 'new'
  const existing = isNew ? null : MOCK_ARTICLES.find(a => a.slug === slug)

  const [title, setTitle] = useState(existing?.title || '')
  const [articleSlug, setArticleSlug] = useState(existing?.slug || '')
  const [status, setStatus] = useState('draft')
  const [category, setCategory] = useState(existing?.category || 'Formula 1')
  const [tags, setTags] = useState(existing?.tags?.join(', ') || '')
  const [premium, setPremium] = useState(existing?.premium || false)
  const [author, setAuthor] = useState(existing?.author || '')
  const [excerpt, setExcerpt] = useState(existing?.excerpt || '')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [scheduleAt, setScheduleAt] = useState('')
  const [heroPreview, setHeroPreview] = useState(existing?.heroImage || null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your article…' }),
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage,
    ],
    content: '',
    editorProps: {
      attributes: { class: 'outline-none' },
    },
  })

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (isNew) setArticleSlug(slugify(e.target.value))
  }

  const handleHeroChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setHeroPreview(url)
    }
  }

  const handleSave = async (publish = false) => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    if (publish) setStatus('published')
  }

  const setLink = useCallback(() => {
    const url = window.prompt('URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  return (
    <AdminLayout>
      <div className="max-w-[1200px] mx-auto">
        {/* Top actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, gap: 16 }}>
          <h1 style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 22, color: 'var(--dta-white)' }}>
            {isNew ? 'New Article' : 'Edit Article'}
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => handleSave(false)} disabled={saving}>
              <Save size={14} />
              {saving ? 'Saving…' : 'Save Draft'}
            </Button>
            <Button variant="primary" size="sm" onClick={() => handleSave(true)} disabled={saving}>
              <Globe size={14} />
              Publish
            </Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
          {/* Editor column */}
          <div className="space-y-4">
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Article headline…"
              style={{
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                fontFamily: '"Barlow Condensed"', fontWeight: 700, fontSize: 36, color: 'var(--dta-white)',
                letterSpacing: '-0.02em', lineHeight: 1.1,
              }}
            />

            {/* Slug */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-muted)' }}>
                drivetheapex.com/article/
              </span>
              <input
                type="text"
                value={articleSlug}
                onChange={e => setArticleSlug(e.target.value)}
                style={{ ...inputStyle, flex: 1, fontSize: 12, padding: '5px 10px' }}
                onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
              />
            </div>

            {/* Status selector */}
            <div style={{ display: 'flex', gap: 0, background: 'var(--dta-surface)', border: '1px solid var(--dta-border)', borderRadius: 4, overflow: 'hidden', width: 'fit-content' }}>
              {['draft', 'pending', 'published'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    padding: '7px 16px',
                    fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: status === s ? (s === 'published' ? 'rgba(39,244,210,0.15)' : s === 'pending' ? 'rgba(212,168,42,0.15)' : 'rgba(255,255,255,0.06)') : 'transparent',
                    color: status === s ? (s === 'published' ? '#27F4D2' : s === 'pending' ? '#D4A82A' : 'var(--dta-white)') : 'var(--dta-muted)',
                    border: 'none', cursor: 'pointer',
                    borderRight: s !== 'published' ? '1px solid var(--dta-border)' : 'none',
                    transition: 'background 150ms, color 150ms',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Hero image upload */}
            <div>
              <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 8 }}>
                Hero Image
              </label>
              {heroPreview ? (
                <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', height: 200 }}>
                  <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                  <button
                    onClick={() => { setHeroPreview(null); fileRef.current.value = '' }}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(14,14,14,0.8)', border: 'none', borderRadius: 4, padding: '4px 10px', fontFamily: 'Inter', fontSize: 12, color: 'var(--dta-white)', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: '1px dashed var(--dta-border-mid)', borderRadius: 6, height: 120,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 8, cursor: 'pointer', background: 'var(--dta-surface)',
                    transition: 'border-color 150ms ease-out',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--dta-red)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--dta-border-mid)'}
                >
                  <ImageIcon size={20} style={{ color: 'var(--dta-muted)' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--dta-muted)' }}>Drop image or click to upload</span>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleHeroChange} style={{ display: 'none' }} />
            </div>

            {/* Rich text editor */}
            <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, overflow: 'hidden' }}>
              {/* Toolbar */}
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--dta-border)', display: 'flex', flexWrap: 'wrap', gap: 2, background: 'var(--dta-surface)' }}>
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Bold">
                  <Bold size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Italic">
                  <Italic size={14} />
                </ToolbarButton>
                <div style={{ width: 1, height: 24, background: 'var(--dta-border)', margin: '4px 4px' }} />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })} title="Heading 1">
                  <Heading1 size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Heading 2">
                  <Heading2 size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Heading 3">
                  <Heading3 size={14} />
                </ToolbarButton>
                <div style={{ width: 1, height: 24, background: 'var(--dta-border)', margin: '4px 4px' }} />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Blockquote">
                  <Quote size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={setLink} active={editor?.isActive('link')} title="Link">
                  <LinkIcon size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Bullet List">
                  <List size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Ordered List">
                  <ListOrdered size={14} />
                </ToolbarButton>
              </div>
              {/* Editor */}
              <div className="tiptap-editor">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Publish card */}
            <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, padding: 20 }}>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: 'var(--dta-white)', marginBottom: 16 }}>Publish</h3>
              <div className="space-y-3">
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Author</label>
                  <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Tags</label>
                  <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="f1, verstappen, bahrain" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--dta-white)' }}>Premium Content</span>
                  <button
                    onClick={() => setPremium(p => !p)}
                    style={{
                      width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                      background: premium ? 'var(--dta-red)' : 'rgba(255,255,255,0.14)',
                      position: 'relative', transition: 'background 220ms ease-out',
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 2, left: premium ? 20 : 2,
                      width: 18, height: 18, borderRadius: '50%', background: '#fff',
                      transition: 'left 220ms cubic-bezier(0.4,0,0.2,1)',
                    }} />
                  </button>
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Schedule Publish</label>
                  <input type="datetime-local" value={scheduleAt} onChange={e => setScheduleAt(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div style={{ background: 'var(--dta-card)', border: '1px solid var(--dta-border)', borderRadius: 6, padding: 20 }}>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: 'var(--dta-white)', marginBottom: 16 }}>SEO</h3>
              <div className="space-y-3">
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Meta Title</label>
                  <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder={title || 'Page title…'} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Meta Description</label>
                  <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Brief description for search results…" rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dta-muted)', display: 'block', marginBottom: 6 }}>Excerpt</label>
                  <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short summary shown in article cards…" rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'var(--dta-red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dta-border)'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
