
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlayerBar from '@/components/PlayerBar';

export const metadata = {
  title: 'RIFSTAGE',
  description: "Source for Riffian Music, News, and Culture",
};

export default function RootLayout({ children }) {
  return (
    <html >
      <body >
        <Navbar />
        <main >{children}</main>
        <Footer />
      </body>
    </html>
  );
}