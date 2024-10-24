import { isClient } from '../lib/common'
import { useLayoutEffect, useEffect, useState } from 'react'

export const useIsomorphicLayoutEffect = isClient() ? useLayoutEffect : useEffect


// 添加自定义 Hook 来监听 localStorage
export function UseLocalStorage(key: string, initialValue: string) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: string) => {
        try {
            setStoredValue(value);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue] as const;
}