import { ClerkProvider } from '@clerk/nextjs';
import './global.css';
import { ThemeProvider } from '../components/theme-provider';

export const metadata = {
  title: 'ABF1 Realty',
  description:
    'The best residential and commercial real estate in the Philippines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
