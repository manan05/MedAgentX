import { useState } from "react";
import { marked } from "marked";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

export default function App() {
  const [reportText, setReportText] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const local_URL = "http://localhost:5000/analyze";
  const prod_URL = "https://medagentx.onrender.com/analyze";

  const validateReport = (text) => {
    if (!text || text.trim().length < 40)
      return "The report seems too short to analyze.";
    const medicalKeywords = [
      "heart",
      "bp",
      "blood pressure",
      "oxygen",
      "respiratory",
      "lungs",
      "fever",
      "asthma",
      "cardiac",
      "anxiety",
      "depression",
      "pulmonary",
      "diagnosis",
      "treatment",
      "symptom",
      "patient",
      "pulse",
      "vitals",
      "breathing",
      "mri",
      "ct",
      "x-ray",
    ];
    const found = medicalKeywords.filter((k) =>
      text.toLowerCase().includes(k)
    ).length;
    if (found < 2)
      return "The input doesn't appear to be a medical report. Please include relevant details (symptoms, vitals, or findings).";
    return "";
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setReportText(newText);

    // live revalidation: remove error if the new text is valid
    if (validationError) {
      const msg = validateReport(newText);
      if (!msg) setValidationError("");
      else setValidationError(msg);
    }
  };

  const handleSubmit = async () => {
    const validationMsg = validateReport(reportText);
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    setValidationError("");
    setLoading(true);
    setResults(null);
    setError("");

    try {
      const res = await fetch(prod_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report: reportText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setResults(data);
      setValidationError("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <MedicalInformationIcon color="primary" fontSize="large" />
            <Typography variant="h4" fontWeight={600}>
              MedAgentX Report Analyzer
            </Typography>
          </Box>

          <TextField
            multiline
            minRows={6}
            maxRows={15}
            value={reportText}
            onChange={handleChange}
            fullWidth
            placeholder="Paste a medical report here..."
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!validationError}
            helperText={validationError || ""}
          />

          <Box display="flex" justifyContent="center" mb={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={loading || !reportText.trim() || !!validationError}
              sx={{ textTransform: "none", px: 5, py: 1.2 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Analyzing...
                </>
              ) : (
                "Analyze Report"
              )}
            </Button>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {!results && !loading && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 4, fontStyle: "italic" }}
            >
              Results will appear here once analysis is complete.
            </Typography>
          )}

          {results && (
            <Box mt={4}>
              <ReportAccordion
                title="🫀 Cardiologist's Report"
                markdown={results.cardiologist}
              />
              <ReportAccordion
                title="🧠 Psychologist's Report"
                markdown={results.psychologist}
              />
              <ReportAccordion
                title="🫁 Pulmonologist's Report"
                markdown={results.pulmonologist}
              />
              <ReportAccordion
                title="🧾 Final MDT Summary"
                markdown={results.summary}
              />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

function ReportAccordion({ title, markdown }) {
  return (
    <Accordion sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: "grey.100",
          "&:hover": { bgcolor: "grey.200" },
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            typography: "body1",
            color: "text.primary",
            "& ul": { pl: 3 },
            "& strong": { color: "primary.main" },
          }}
          dangerouslySetInnerHTML={{ __html: marked.parse(markdown || "") }}
        />
      </AccordionDetails>
    </Accordion>
  );
}
