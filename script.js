document.getElementById("run").onclick = runCode;
document.getElementById("download").onclick = downloadCode;

function interpretGubbuScript(code) {
  let html = "";
  const lines = code.split("\n");
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("title:")) {
      const title = line.split("title:")[1].trim();
      html += `<h1>${title}</h1>`;
    }
    else if (line.startsWith("text:")) {
      const text = line.split("text:")[1].trim();
      html += `<p>${text}</p>`;
    }
    else if (line.startsWith("button:")) {
      const match = line.match(/button:(.*)->(.*)/);
      if (match) {
        const btn = match[1].trim();
        const action = match[2].trim();
        html += `<button onclick='${action}'>${btn}</button>`;
      }
    }
  }
  return html;
}

function runCode() {
  const code = document.getElementById("code").value;
  const html = interpretGubbuScript(code);
  const iframe = document.getElementById("output");
  iframe.contentDocument.body.innerHTML = html;
}

function downloadCode() {
  const code = document.getElementById("code").value;
  const htmlContent = interpretGubbuScript(code);

  const htmlFile = `
<!DOCTYPE html>
<html>
<head><title>GubbuSite</title></head>
<body>
${htmlContent}
</body>
</html>`;

  const blob = new Blob([htmlFile], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "GubbuSite.html";
  link.click();
}
