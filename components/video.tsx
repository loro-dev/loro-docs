"use client";

import dynamic from 'next/dynamic'

export const ReactPlayer = dynamic(
  () => import('react-player').then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => <div>Loading video...</div>
  }
)
