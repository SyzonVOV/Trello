import { useLayoutEffect, useRef } from 'react'

export const useFocus = () => {
    const ref = useRef<HTMLInputElement>(null)
    useLayoutEffect(() => {
        ref.current?.focus()
    })
    return ref
}