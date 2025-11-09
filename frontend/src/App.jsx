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
      if (!res.ok) throw new Error(data.error || "Server error");
      setResults(data);
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
            onChange={(e) => setReportText(e.target.value)}
            fullWidth
            placeholder="Paste a medical report here..."
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Box display="flex" justifyContent="center" mb={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={loading || !reportText.trim()}
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
