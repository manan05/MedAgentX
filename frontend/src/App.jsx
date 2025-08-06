import { useState } from "react";
import { marked } from "marked";

function App() {
  const [reportText, setReportText] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setResults(null);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report: reportText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '20px'}} className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 flex flex-col items-center font-sans margin">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          🩺 MedAgentX Report Analyzer
        </h1>

        <textarea
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Paste a medical report here..."
          className="w-full max-w-3xl h-40 p-4 border border-gray-300 rounded-lg resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading || !reportText.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Report"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        <div className="mt-8 space-y-6">
          {!results && !loading && (
            <div className="text-gray-500 text-center italic">
              Results will appear here once analysis is complete.
            </div>
          )}

          {results && (
            <>
              <ReportSection
                title="🫀 Cardiologist's Report"
                markdown={results.cardiologist}
              />
              <ReportSection
                title="🧠 Psychologist's Report"
                markdown={results.psychologist}
              />
              <ReportSection
                title="🫁 Pulmonologist's Report"
                markdown={results.pulmonologist}
              />
              <ReportSection
                title="🧾 Final MDT Summary"
                markdown={results.summary}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ReportSection({ title, markdown }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
      <div
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: marked.parse(markdown || "") }}
      />
    </div>
  );
}

export default App;
