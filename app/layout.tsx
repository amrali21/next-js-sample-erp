import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import axios from 'axios';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  console.log('done setting axios root');

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
