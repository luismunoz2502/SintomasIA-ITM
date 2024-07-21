
import { IMAGE_URL } from "../../config"
import '../App.css'

export const Home = () => {
    return (
        <article className='contentHome'>
            <img className='imageLogo' src={IMAGE_URL} alt="" />
            <h1>Voice Chat Transcriber: Speak and Chat</h1>
            <p className='description'>Talk to our voice-based chat system. Speak, and your voice is converted into text, then interact with ChatGPT for instant responses. It`s easy, fast, and hassle-free!</p>
            <a  href="https://www.dfx5.com" target="_blank">
                <button className='buttonLearMore'>Learn more</button>
            </a>
        </article>
    )
}