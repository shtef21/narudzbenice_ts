import { useEffect } from "react";

export function useLocalStorage(key, value) {
    const [val, setVal] = useState(value);

    useEffect(() => {
        localStorage.setItem(key, val);
    }, [val]);

    return [val, setVal];
}
