export interface Quote {
    text: string;
    speaker: string;
}

export const fallbackQuotes: Quote[] = [
    { text: "We are the knights who say... Ni!", speaker: "Knights Who Say Ni" },
    { text: "It's just a flesh wound.", speaker: "Black Knight" },
    { text: "Nobody expects the Spanish Inquisition!", speaker: "Cardinal Ximénez" },
    { text: "I'm not dead yet!", speaker: "Plague Victim" },
    { text: "What is the air-speed velocity of an unladen swallow?", speaker: "Bridge Keeper" },
    { text: "This is an ex-parrot!", speaker: "Mr. Praline" },
    { text: "We're all individuals!", speaker: "The Crowd" },
    { text: "Strange women lying in ponds distributing swords is no basis for a system of government.", speaker: "Dennis" },
    { text: "I fart in your general direction.", speaker: "French Guard" },
    { text: "Always look on the bright side of life.", speaker: "Brian" },
    { text: "He's a very naughty boy.", speaker: "Brian's Mother" },
    { text: "What have the Romans ever done for us?", speaker: "Reg" },
];

function getRandomFallback(): Quote {
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}

export async function fetchQuote(): Promise<Quote> {
    try {
        const res = await fetch(
            'https://monty-pythons-flying-api.fly.dev/v1/quotes/random?min_length=10&max_length=100',
            { signal: AbortSignal.timeout(3000) }
        );

        if (!res.ok) return getRandomFallback();

        const data = await res.json();

        // Adapt based on actual API response shape
        return {
            text: data.quote,
            speaker: data.character
        };
    } catch {
        return getRandomFallback();
    }
}