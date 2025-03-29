// // 'use client';

// // import { ReactNode, useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { AppDispatch } from '@/lib/store';
// // import { loginSuccess } from '@/lib/features/authSlice';
// // import {  useSession } from 'next-auth/react';

// // export default function AuthProvider({ children }: { children: ReactNode }) {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { data: session } = useSession();

// //   console.log(session, 'session');
  

// //   useEffect(() => {
// //     if (session?.user) {
// //       const userData = {
// //         email: session.user.email || '',
// //         role: 'user',
// //         name: session.user.name || '',
// //       };
// //       dispatch(loginSuccess(userData as any));
// //     }
// //   }, [session, dispatch]);


// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {children}
// //     </div>
// //   );
// // }

// 'use client';

// import { ReactNode, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/lib/store';
// import { loginSuccess } from '@/lib/features/authSlice';
// import { useSession } from 'next-auth/react';

// export default function AuthProvider({ children }: { children: ReactNode }) {
//   const dispatch = useDispatch<AppDispatch>();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user) {
//       const userData: any = {
//         email: session.user.email || '',
//         role: 'user', // You might want to get this from a database
//         name: session.user.name || '',
//         image: session.user.image || '',
//       };
      
//       // Save to localStorage if needed
//       localStorage.setItem('user', JSON.stringify(userData));
      
//       // Update Redux store
//       dispatch(loginSuccess(userData));
//     }
//   }, [session, status, dispatch]);

//   return <>{children}</>;
// }

'use client';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { loginSuccess } from '@/lib/features/authSlice';
import { useSession } from 'next-auth/react';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session status:', status); // Debug logging
    console.log('Session data:', session); // Debug logging
    
    if (status === 'authenticated' && session?.user) {
      const userData : any = {
        email: session.user.email || '',
        role: 'user', // Default role - consider fetching from your DB
        name: session.user.name || '',
        image: session.user.image || '',
      };
      
      console.log('Dispatching login success with:', userData); // Debug logging
      
      // Save to localStorage if needed
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update Redux store
      dispatch(loginSuccess(userData));
    }
  }, [session, status, dispatch]);

  return <>{children}</>;
}

