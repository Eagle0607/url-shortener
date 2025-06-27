export function logEvent(event, details = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    ...details
  };

  const logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
}
