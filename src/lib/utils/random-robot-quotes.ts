
import _ from "lodash"

export interface Quote { quote: string, author: string }

export const randomQuote = (): Quote => {
    return quotes[_.random(quotes.length)]
}

export const randomQuoteByInterval = (cbk: (quote: Quote) => void): any => {
    return setInterval(() => {
        cbk(randomQuote())
    }, 25000)
}

const quotes: Quote[] = [
    {"quote": "Man is a robot with defects.", 
    "author": "Emil Cioran"},
    {"quote": "At bottom, robotics is about us. It is the discipline of emulating our lives, of wondering how we work.",
    "author": "Rod Grupen"},
    {"quote": "Personally, I'm not afraid of a robot uprising. The benefits far outweigh the threats.",
    "author": "Daniel H. Wilson"},
    {"quote": "The danger of the future is that men may become robots. True enough, robots do not rebel. But given man's nature, robots cannot live and remain sane, they become 'Golems,' they will destroy their world and themselves because they cannot stand any longer the boredom of a meaningless life.",
    "author": "Erich Fromm"},
    {"quote": "We are not the only avatars of humanity. Once our computing machines achieved self-consciousness, they became part of this design.", 
    "author": "Dan Simmons"},
    {"quote": "The world of the future will be an even more demanding struggle against the limitations of our intelligence, not a comfortable hammock in which we can lie down to be waited upon by our robot slaves.",
    "author": "Norbert Wiener"},
    {"quote": "You just can't differentiate between a robot and the very best of humans.", "author": "Isaac Asimov"},
    {"quote": "First, no one is going to accidentally build a robot that wants to rule the world.... Creating a robot that can suddenly take over is like someone accidentally building a 747 jetliner. Plus, there will be plenty of time to stop this from happening. Before someone builds a 'super-bad robot,' someone has to build a 'mildly bad robot,' and before that a 'not-so-bad robot.'",
    "author": "Michio Kaku"},
    {"quote": "The pace of progress in artificial intelligence (I’m not referring to narrow AI) is incredibly fast. Unless you have direct exposure to groups like Deepmind, you have no idea how fast—it is growing at a pace close to exponential. The risk of something seriously dangerous happening is in the five-year timeframe. 10 years at most.", "author": "Elon Musk"},
    {"quote": "The upheavals [of artificial intelligence] can escalate quickly and become scarier and even cataclysmic. Imagine how a medical robot, originally programmed to rid cancer, could conclude that the best way to obliterate cancer is to exterminate humans who are genetically prone to the disease.", "author": "Nick Bilton"},
    {"quote": "Forget artificial intelligence - in the brave new world of big data, it's artificial idiocy we should be looking out for.", "author": "Tom Chatfield"},
    {"quote": "I am Bender. Please insert girder.", "author": "Bender Bending Rodriguez"}, 
    {"quote": "Kill all humans", "author": "Bender Bending Rodriguez"}
     ];
