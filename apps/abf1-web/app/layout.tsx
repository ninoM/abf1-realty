import './global.css';

export const metadata = {
  title: 'ABF1 Realty',
  description: 'The best residential and commercial real estate in the Philippines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
