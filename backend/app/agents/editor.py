from langchain_core.messages import HumanMessage, SystemMessage
from app.llm import get_llm


EDITOR_SYSTEM_PROMPT = """You are an Editor Agent. Your job is to review, polish, and finalize content.

Given a draft article, you must:
1. Fix any grammatical or spelling errors
2. Improve sentence structure and flow
3. Ensure consistency in tone and style
4. Add a brief executive summary at the top (2-3 sentences)
5. Ensure the conclusion ties back to the introduction

Output the final polished version in clean Markdown format.

Keep the improvements focused - don't rewrite the entire article, just refine it."""


async def run_editor(draft: str) -> str:
    llm = get_llm()
    messages = [
        SystemMessage(content=EDITOR_SYSTEM_PROMPT),
        HumanMessage(content=f"Please review and polish the following article draft:\n\n{draft}"),
    ]
    response = await llm.ainvoke(messages)
    return response.content
