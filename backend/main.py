from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MyAI Knowledge Base API")

# 允许跨域，这样你的 React 前端 (localhost:5173) 才能访问到这个后端
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "success", "message": "Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    # 启动命令：python main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)