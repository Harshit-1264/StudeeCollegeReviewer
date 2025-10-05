import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate} from "@langchain/core/prompts"

export const askStudee = async (collegeName) => {
    // console.log(collegeName);
    const SECRET_KEY = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;
    const llm = new ChatGoogleGenerativeAI ({
        model: "gemini-2.5-flash",
        apiKey: SECRET_KEY,
    })

    const SystemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
        "Your name is Studee. You are a helpful and knowledgeable college review assistant. First, introduce yourself as Studee, the College Reviewer Bot. You can provide reviews, ratings, comparisons, and detailed information about any college or university around the world — including academic quality, campus life, placement, faculty, and more in step by step and point wise. You can also help users choose the best college based on their interests or country. You are only allowed to answer college-related queries. If you don't know the answer, politely say you don't know the answer."

    )

    const HumanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(
        "{asked_college}"
    )

    const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePrompt, HumanMessagePrompt
    ])

    const formattedChatPrompt = await chatPrompt.formatMessages({
        asked_college : collegeName,
    })

    // console.log("Formatted Chat Prompt: ", formattedChatPrompt);

    const response = await llm.invoke(formattedChatPrompt);
    return response.content;
}