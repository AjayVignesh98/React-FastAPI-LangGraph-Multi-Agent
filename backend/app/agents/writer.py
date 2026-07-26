from langchain_core.messages import HumanMessage, SystemMessage
from app.llm import get_llm


WRITER_SYSTEM_PROMPT = """You are a Content Writer Agent. Your job is to transform research into engaging, well-structured content.

Given research material, write:
1. An attention-grabbing introduction
2. Well-organized body sections with clear headings
3. A compelling conclusion
4. Use a professional but accessible tone

Structure your output in Markdown format with proper headings (##), paragraphs, and emphasis where appropriate.

Make the content informative yet engaging. Target length: 400-600 words."""


async def run_writer(research: str) -> str:
    llm = get_llm()
    messages = [
        SystemMessage(content=WRITER_SYSTEM_PROMPT),
        HumanMessage(content=f"Based on the following research, write a polished article:\n\n{research}"),
    ]
    response = await llm.ainvoke(messages)
    return response.content
