"use client"
import { getAccessToken } from "@/app/api/getAccessToken";
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cart: CartResponse | null,
    cartId?: string | null,
    setCart: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart: () => void
}>({
    cart: null,
    cartId: null,
    setCart: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { }
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [cartId, setCartId] = useState<string | null>(null)

    async function getCart() {
        setIsLoading(true)

        let accessToken;
        try {
            accessToken = await getAccessToken();
        } catch (err) {
            console.error("Failed to get access token", err);
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/get-cart', {
                headers: {
                    token: accessToken || ""
                }
            });

            if (!res.ok) {
                console.error("get-cart failed", res.status, await res.text());
                setCart(null);
                setCartId(null);
                setIsLoading(false);
                return;
            }

            const data: CartResponse = await res.json();
            setCart(data);
            setCartId(data.cartId);
        } catch (err) {
            console.error("Error fetching cart:", err);
            setCart(null);
            setCartId(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    return <CartContext.Provider value={{ cart, cartId, setCart, isLoading, setIsLoading, getCart }}>
        {children}
    </CartContext.Provider>
}
