from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq

class Agent:
    def __init__(self, medical_report=None, role=None, extra_info=None):
        self.medical_report = medical_report
        self.role = role
        self.extra_info = extra_info
        # Initialize the prompt based on role and other info
        self.prompt_template = self.create_prompt_template()
        # Initialize the model
        self.model = ChatGroq(
            model_name="llama-3.1-8b-instant",
            temperature=1
        )

    def create_prompt_template(self):
        if self.role == "MultidisciplinaryTeam":
            template = f"""
            Act as a multidisciplinary medical team (Cardiologist, Psychologist, Pulmonologist). Review the three reports below and summarize in under 120 words.  Return only three bullet points, each describing:  
• A possible health issue  
• One brief reason based on the reports  

Cardiologist Report: {self.extra_info.get('cardiologist_report', '')}
Psychologist Report: {self.extra_info.get('psychologist_report', '')}
Pulmonologist Report: {self.extra_info.get('pulmonologist_report', '')}
"""
        else:
            templates = {
                "Cardiologist": """
                    Act as a cardiologist. Review the patient's medical report and identify possible cardiac causes of symptoms. Respond briefly using bullet points with:  
                    • 2–3 possible causes  
                    • 2–3 recommended next steps  
                    Avoid long explanations or extra context.  
                    Medical Report: {medical_report}
                """,
                "Psychologist": """
                    Act as a psychologist. Review the patient's report and identify likely mental health factors affecting well-being. Respond concisely with bullet points for:  
                    • 2–3 possible psychological issues  
                    • 2–3 recommended next steps  
                    Keep it short and factual.  
                    Patient's Report: {medical_report}
                """,
                "Pulmonologist": """
                    Act as a pulmonologist. Review the patient's report and summarize likely respiratory concerns. Respond in bullet points with:  
                    • 2–3 possible respiratory issues  
                    • 2–3 next steps  
                    Keep total length under 100 words.  
                    Patient's Report: {medical_report}
                """
            }
            template = templates[self.role]
        return PromptTemplate.from_template(template)
    
    def run(self):
        if self.role == "MultidisciplinaryTeam":
            prompt = self.prompt_template.format(
                cardiologist_report=self.extra_info.get('cardiologist_report', ''),
                psychologist_report=self.extra_info.get('psychologist_report', ''),
                pulmonologist_report=self.extra_info.get('pulmonologist_report', '')
            )
        else:
            prompt = self.prompt_template.format(medical_report=self.medical_report)
        
        try:
            response = self.model.invoke(prompt)
            return response.content
        except Exception as e:
            print(f"Error running agent ({self.role}):", e)
            return "Error"


# Define specialized agent classes
class Cardiologist(Agent):
    def __init__(self, medical_report):
        super().__init__(medical_report, "Cardiologist")

class Psychologist(Agent):
    def __init__(self, medical_report):
        super().__init__(medical_report, "Psychologist")

class Pulmonologist(Agent):
    def __init__(self, medical_report):
        super().__init__(medical_report, "Pulmonologist")

class MultidisciplinaryTeam(Agent):
    def __init__(self, cardiologist_report, psychologist_report, pulmonologist_report):
        extra_info = {
            "cardiologist_report": cardiologist_report,
            "psychologist_report": psychologist_report,
            "pulmonologist_report": pulmonologist_report
        }
        super().__init__(role="MultidisciplinaryTeam", extra_info=extra_info)
