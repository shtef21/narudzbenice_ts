import { useEffect, useState } from "react";

export function useLocalStorage(key: string, value: string) {
    const [val, setVal] = useState<string>(value);

    useEffect(() => {
        localStorage.setItem(key, val);
    }, [val]);

    return [val, setVal];
}
