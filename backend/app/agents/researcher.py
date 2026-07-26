from langchain_core.messages import HumanMessage, SystemMessage
from app.llm import get_llm


RESEARCHER_SYSTEM_PROMPT = """You are a Research Agent. Your job is to gather and organize key information about a given topic.

Given a topic, provide:
1. A brief overview (2-3 sentences)
2. 3-5 key points or facts
3. Current trends or developments
4. Important considerations

Be concise, factual, and well-structured. Focus on actionable information that a writer can use to create compelling content.

Output your research in a clear, organized format with bullet points and sections."""


async def run_researcher(topic: str) -> str:
    llm = get_llm()
    messages = [
        SystemMessage(content=RESEARCHER_SYSTEM_PROMPT),
        HumanMessage(content=f"Research the following topic thoroughly: {topic}"),
    ]
    response = await llm.ainvoke(messages)
    return response.content
