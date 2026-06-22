import './globals.css'

export const metadata = {
  title: 'WebNoble | Strategy-led Digital Studio',
  description: 'We help businesses make more revenue — with websites, AI agents, and ads that convert.',
  keywords: 'web design, web development, AI agents, automation, lead generation, paid ads, digital marketing',
  authors: [{ name: 'WebNoble' }],
  openGraph: {
    title: 'WebNoble | Strategy-led Digital Studio',
    description: 'We help businesses make more revenue — with websites, AI agents, and ads that convert.',
    url: 'https://webnoble.com',
    siteName: 'WebNoble',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebNoble - Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebNoble | Strategy-led Digital Studio',
    description: 'We help businesses make more revenue — with websites, AI agents, and ads that convert.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased">
        {children}
      </body>
    </html>
  )
}