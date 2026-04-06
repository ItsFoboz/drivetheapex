import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

// Public pages
const HomePage = lazy(() => import('@/pages/HomePage'))
const ArticlePage = lazy(() => import('@/pages/ArticlePage'))
const VideosPage = lazy(() => import('@/pages/VideosPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const RaceHubPage = lazy(() => import('@/pages/RaceHubPage'))
const MembershipPage = lazy(() => import('@/pages/MembershipPage'))
const MerchPage = lazy(() => import('@/pages/MerchPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))

// Admin pages
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const ArticlesListPage = lazy(() => import('@/pages/admin/ArticlesListPage'))
const ArticleEditorPage = lazy(() => import('@/pages/admin/ArticleEditorPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" style={{ background: 'var(--dta-black)' }}>
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--dta-red)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" style={{ background: 'var(--dta-black)' }}>
      <span style={{ fontFamily: '"Barlow Condensed"', fontWeight: 800, fontSize: 96, color: 'var(--dta-red)', lineHeight: 1 }}>404</span>
      <p style={{ fontFamily: '"Barlow Condensed"', fontWeight: 700, fontStyle: 'italic', fontSize: 24, color: 'var(--dta-white)' }}>
        Off the track.
      </p>
      <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--dta-muted)', marginBottom: 8 }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          fontFamily: 'Inter', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--dta-red)', textDecoration: 'none', transition: 'color 150ms',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--dta-red-hover)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--dta-red)'}
      >
        ← Back to Home
      </a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin routes — no public layout */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <ProtectedRoute>
                <ArticlesListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles/:slug/edit"
            element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            }
          />

          {/* Public routes — wrapped in Layout */}
          <Route
            path="/*"
            element={
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/news" element={<HomePage />} />
                    <Route path="/formula-1" element={<HomePage />} />
                    <Route path="/article/:slug" element={<ArticlePage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/galleries" element={<GalleryPage />} />
                    <Route path="/race-hub" element={<RaceHubPage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/merch" element={<MerchPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {/* Redirect /admin without sub-path to admin */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
