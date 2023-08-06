import { ClerkProvider } from '@clerk/nextjs';
import './global.css';

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
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
