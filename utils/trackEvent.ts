export const trackEvent = (
    action: string,
    category: string,
    label?: string
  ) => {
    window.gtag?.("event", action, {
      event_category: category,
      event_label: label,
    })
  }