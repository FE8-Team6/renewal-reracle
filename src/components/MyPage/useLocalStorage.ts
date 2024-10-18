// import { useState } from 'react';


// export function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getItem = () => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);
//       return initialValue;
//     }
//   };

//   return { getItem, setItem: setValue };
// }


// export const useLocalStorage = (key: string) => {
// 	const setItem = (value: unknown) => {
// 		try {
// 			window.localStorage.setItem(key, JSON.stringify(value))
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// 	const getItem = () => {
// 		try {
//       const item = window.localStorage.getItem(key)
// 			return item ? JSON.parse(item) : undefined    	 
// 		} catch (error) {
//       console.log(error)
//     }
// 	}

// 	return {setItem, getItem }
// }