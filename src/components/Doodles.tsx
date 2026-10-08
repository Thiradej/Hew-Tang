// Cartoon coin and star from the Chop Tang logo, shared across pages
export function Coin({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="#F5C542" stroke="#0E3E66" strokeWidth="3" />
            <circle cx="24" cy="24" r="14" fill="none" stroke="#D99A2B" strokeWidth="2.5" />
            <path d="M14 18a12 12 0 0 1 8-6" fill="none" stroke="#FFF3C4" strokeWidth="3" strokeLinecap="round" />
        </svg>
    )
}

export function Star({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                d="M12 2.5l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 16.9 6.3 20l1.2-6.4L2.8 9.2l6.4-.8z"
                fill="#FEC969"
                stroke="#0E3E66"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    )
}
