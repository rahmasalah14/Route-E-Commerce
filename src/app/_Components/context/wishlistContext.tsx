"use client"
import { WishResponse } from "@/interfaces/wishlist";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getAccessToken } from "@/app/api/getAccessToken"; // استخدمي نفس الطريقة اللي في CartContext

export const WishContext = createContext<{
    wish: WishResponse | null,
    setWish: (value: WishResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getWish: () => void
}>({
    wish: null,
    setWish: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getWish: () => { }
})

export default function WishContextProvider({ children }: { children: ReactNode }) {

    const [wish, setWish] = useState<WishResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function getWish() {
        setIsLoading(true)

        let token;
        try {
            token = await getAccessToken(); // dynamic token لكل مستخدم
        } catch (err) {
            console.error("Failed to get access token", err);
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/get-wish', {
                headers: { token: token || "" }
            });

            if (!res.ok) {
                console.error("get-wish failed", res.status, await res.text());
                setWish(null);
                setIsLoading(false);
                return;
            }

            const data: WishResponse = await res.json();
            setWish(data);

        } catch (err) {
            console.error("Error fetching wish:", err);
            setWish(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getWish()
    }, [])

    return <WishContext.Provider value={{ wish, setWish, isLoading, setIsLoading, getWish }}>
        {children}
    </WishContext.Provider>
}
