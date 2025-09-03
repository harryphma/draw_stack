import './globals.css'

export const metadata = {
  title: 'Draw Stack',
  description: 'A visual tool for designing software architecture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
