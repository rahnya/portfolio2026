"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AnalyticsTracker(){

  const pathname = usePathname()

  useEffect(() => {
    window.gtag?.("config", "G-N4DJGHWE6D", {
      page_path: pathname,
    })
  }, [pathname])

  return null
}