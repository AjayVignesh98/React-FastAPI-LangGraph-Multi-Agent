from langchain_ollama import ChatOllama
from app.config import get_settings


def get_llm() -> ChatOllama:
    settings = get_settings()
    return ChatOllama(
        model=settings.OLLAMA_MODEL,
        base_url=settings.OLLAMA_BASE_URL,
        temperature=0.7,
        num_ctx=4096,
    )
