import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'W.S. Fong Family Fund',
  description: 'The W.S. Fong Family Fund brings our family together to make a meaningful impact by donating to causes we care about.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream text-dark-green font-sans antialiased">
        {children}
      </body>
    </html>
  );
}