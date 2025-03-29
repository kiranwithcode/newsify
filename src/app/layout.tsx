// // // src/app/layout.tsx
// 'use client' // Add this since we're using client-side functionality

// import { Inter } from 'next/font/google'
// import './globals.css'
// import { Provider } from 'react-redux'
// import { makeStore } from '@/lib/store'
// import SessionProvider from '@/components/auth/SessionProvider'

// const inter = Inter({ subsets: ['latin'] })

// const store = makeStore()

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SessionProvider>
//           <Provider store={store}>
//             {children}
//           </Provider>
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }

'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });
const store = makeStore();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}