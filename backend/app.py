from flask import Flask, request, jsonify
from flask_cors import CORS
from agents import Cardiologist, Psychologist, Pulmonologist, MultidisciplinaryTeam
import os
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_report():
    data = request.get_json()
    report_text = data.get('report', '')

    if not report_text.strip():
        return jsonify({"error": "Empty report text"}), 400

    try:
        # Run individual agents
        cardiologist_agent = Cardiologist(report_text)
        cardiologist_result = cardiologist_agent.run()

        psychologist_agent = Psychologist(report_text)
        psychologist_result = psychologist_agent.run()

        pulmonologist_agent = Pulmonologist(report_text)
        pulmonologist_result = pulmonologist_agent.run()

        # Run MDT agent using the outputs above
        mdt_agent = MultidisciplinaryTeam(
            cardiologist_report=cardiologist_result,
            psychologist_report=psychologist_result,
            pulmonologist_report=pulmonologist_result
        )
        final_summary = mdt_agent.run()

        # Save to backend/result/ folder
        # timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        # output_file = f"result/summary-{timestamp}.txt"
        # os.makedirs(os.path.dirname(output_file), exist_ok=True)
        # with open(output_file, 'w', encoding='utf-8') as f:
        #     f.write(final_summary)

        return jsonify({
            "cardiologist": cardiologist_result,
            "psychologist": psychologist_result,
            "pulmonologist": pulmonologist_result,
            "summary": final_summary
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
