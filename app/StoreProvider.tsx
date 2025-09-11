// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
// import { AppStore, makeStore } from '@/store/store';
// // import { PersistGate } from 'redux-persist/integration/react';

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore>();
//   // const persistorRef = useRef<any>(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     if (!storeRef.current) {
//       storeRef.current = makeStore();
//       //   // persistorRef.current = makePersistor(storeRef.current);
//       // }
//     }

//   }, []);

//   if (!isClient) {
//     return <>{children}</>;
//   }

//   return (
//     <Provider store={storeRef.current!}>
//       {/* <PersistGate loading={null} persistor={persistorRef.current!}>
//         {children}
//       </PersistGate> */}
//       {children}
//     </Provider>
//   );
// }