# 🩺 MedAgentX — AI-Powered Multispecialty Medical Diagnosis Assistant

![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![LangChain](https://img.shields.io/badge/LangChain-Framework-green)
![Groq](https://img.shields.io/badge/LLM-Groq%20LLaMA--3%2070B-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

**MedAgentX** is an AI-driven medical diagnostic assistant that simulates consultations with multiple healthcare specialists.  
Using **LangChain**, **Groq's LLaMA-3-70B**, and concurrent processing, it reviews patient medical reports through three virtual agents — **Cardiologist**, **Psychologist**, and **Pulmonologist** — and then combines their insights into a **final multidisciplinary diagnosis**.

---

## 🚀 Features
- **Multi-Agent Collaboration** — Three specialized AI agents analyze the report independently.
- **Concurrent Processing** — Runs all specialists in parallel for faster results.
- **Multidisciplinary Team Synthesis** — Aggregates insights to produce a final, reasoned diagnosis.
- **Groq LLaMA-3 Integration** — Harnesses the power of a large language model with free API access.
- **Customizable Specialties** — Easily extend to other medical domains.
- **Offline Output** — Saves the final diagnosis to a `.txt` file.

---
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/medagentx.git
cd medagentx
```

### 2️⃣ Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Get your Groq API key
Sign up at https://console.groq.com
Copy your API key

### 5️⃣ Set up .env
Create a .env file in the project root:
```ini
GROQ_API_KEY=your_groq_api_key_here
```

### 6️⃣ Run the project
```bash
python main.py
```

### Output will be saved in:
```bash
results/final_diagnosis.txt
```

## 🛠️ Technologies Used
- **Python 3.10+**

- **LangChain — Agent orchestration**

- **Groq API — LLaMA-3-70B model**

- **dotenv — Environment variable management**

- **Concurrent Futures — Parallel agent execution**

## 🔮 Future Improvements
- Add more specialties (Neurologist, Endocrinologist, Gastroenterologist)

- Integrate medical knowledge bases for factual verification

- Generate a formatted PDF report instead of plain text

- Implement a web UI with Streamlit or FastAPI