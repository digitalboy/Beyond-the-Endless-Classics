import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '古文观止 · 观不止 - 华夏先贤交互式水墨短剧',
  description: '文止于此，人观不止。超越文本，以先贤为宇宙，沉浸式经历千古名作背后的生命史诗。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@300;400;600;700;900&family=ZCOOL+XiaoWei&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#141211] text-paper-cooked overflow-x-hidden selection:bg-cinnabar/30 selection:text-paper-raw">
        {children}
      </body>
    </html>
  );
}
