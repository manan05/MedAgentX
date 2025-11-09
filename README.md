# 🩺 MedAgentX — AI-Powered Multispecialty Medical Diagnosis Assistant

![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![LangChain](https://img.shields.io/badge/LangChain-Framework-green)
![Groq](https://img.shields.io/badge/LLM-Groq%20LLaMA--3%2070B-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

**MedAgentX** is an AI-driven medical diagnostic assistant that simulates consultations with multiple healthcare specialists.  
Using **LangChain**, **Groq's LLaMA-3-70B**, and concurrent processing, it reviews patient medical reports through three virtual agents — **Cardiologist**, **Psychologist**, and **Pulmonologist** — and then combines their insights into a **final multidisciplinary diagnosis**.

This is a full-stack web app with a **Flask** backend and **React + Tailwind CSS** frontend.

Check out the tool [MedAgentX](https://med-agent-x.vercel.app/)

---

## 🚀 Features
- **Multi-Agent Collaboration** — Three specialized AI agents analyze the report independently.
- **Concurrent Processing** — Runs all specialists in parallel for faster results.
- **Multidisciplinary Team Synthesis** — Aggregates insights to produce a final, reasoned diagnosis.
- **Groq LLaMA-3 Integration** — Harnesses the power of a large language model with free API access.
- **Modern UI** — Clean, responsive web interface using React and Tailwind CSS.
- **Customizable Specialties** — Easily extend to other medical domains.
- **API-first Design** — Flask backend serves predictions via REST API.

---
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/medagentx.git
cd medagentx
```

### 2️⃣ Backend Setup (Flask) - Create a virtual environment
```bash
cd backend
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

### 6️⃣ Run the backend server
```bash
python app.py
```

By default, this runs on
```bash
http://localhost:5000
```

### 7️⃣ Frontend Setup (React + Tailwind CSS)
Open a new terminal, then:
```bash
cd ../frontend
npm install
npm run dev
```

This runs the React app on
```bash
http://localhost:5173
```

## 🛠️ Technologies Used

### Backend

- **Python 3.10+**

- **Flask**

- **LangChain — Agent orchestration**

- **Groq API — LLaMA-3-70B model**

- **dotenv — Environment variable management**

- **Concurrent Futures — Parallel agent execution**

### Frontend

- **React**

- **Vite**

- **Tailwind CSS**

- **Axios (for API calls)**


## 🔮 Future Improvements
- **Add more specialties (Neurologist, Endocrinologist, Gastroenterologist)**

- **Add PDF export of final report**

- **Add file history & user accounts**
