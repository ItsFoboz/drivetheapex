import React from 'react'
import Hero from '@/components/home/Hero'
import BreakingNewsTicker from '@/components/home/BreakingNewsTicker'
import ContentGrid from '@/components/home/ContentGrid'
import RaceWidget from '@/components/home/RaceWidget'
import VideoSection from '@/components/home/VideoSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BreakingNewsTicker />
      <ContentGrid />
      <RaceWidget />
      <VideoSection />
    </main>
  )
}
