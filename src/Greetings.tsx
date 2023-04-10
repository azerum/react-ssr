import React from 'react'

export interface GreetingsProps {
    name: string
}

export function Greetings({ name }: GreetingsProps) {
    return <p>Hello, {name}</p>
}
