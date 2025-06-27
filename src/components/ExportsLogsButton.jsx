import { Button } from "@mui/material";

const ExportLogsButton = () => {
  const handleExport = () => {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    const csv = logs.map(log =>
      Object.values(log).map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")
    );
    const headers = Object.keys(logs[0] || {}).join(",");
    const blob = new Blob([headers + "\n" + csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.csv";
    a.click();
  };

  return <Button onClick={handleExport}>Download Logs (.csv)</Button>;
};

export default ExportLogsButton;
