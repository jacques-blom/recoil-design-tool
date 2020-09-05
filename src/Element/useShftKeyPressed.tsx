import {useState, useEffect} from 'react'

/**
 * Returns true when the shift key is pressed in.
 * Returns false if it isn't.
 */
export const useShiftKeyPressed = () => {
    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            setPressed(event.shiftKey)
        }
        const keyup = (event: KeyboardEvent) => {
            setPressed(false)
        }

        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        return () => {
            document.removeEventListener('keydown', keydown)
            document.removeEventListener('keyup', keyup)
        }
    }, [])

    return pressed
}
