import { dark } from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs';
import './global.css';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '../components/toaster';

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
      <ClerkProvider
        appearance={{ baseTheme: dark, layout: { shimmer: true }, variables: {
          colorPrimary: "hsl(263.4 70% 50.4%)",
          borderRadius: "0"

          // formButtonPrimary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          // footerActionLink: "text-primary underline-offset-4 hover:underline",
          // card: "rounded-xl border bg-card text-card-foreground shadow"
        } }}
      >
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
