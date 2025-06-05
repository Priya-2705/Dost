import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: 'Dost',
  description: 'A hybrid blogging platform for developers and creators.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-white">
        <Navbar />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}