// // src/app/page.tsx
// import LoginForm from '@/components/auth/LoginForm'

// export default function Home() {
//   return <LoginForm />
// }
'use client'
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/news');
}
