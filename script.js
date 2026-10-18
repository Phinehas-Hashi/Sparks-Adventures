const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("interest-form");
const result = document.getElementById("form-result");

if (form && result) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const note = [
      "Sparks Adventures — expression of interest",
      "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Interested in: ${data.get("interest-type")}`,
      `Group size: ${data.get("group")}`,
      `Notes: ${data.get("message") || "None"}`,
      "",
      "I understand this is an expression of interest only. No trip is confirmed and no payment has been made.",
      "",
      "Sparks Adventures is an emerging venture in the Spark Stack International ecosystem."
    ].join("\n");

    result.hidden = false;
    result.replaceChildren();
    const intro = document.createElement("p");
    intro.textContent = "Your note is ready below. This prototype has not sent or saved your details.";
    const preview = document.createElement("pre");
    preview.textContent = note;
    preview.style.whiteSpace = "pre-wrap";
    preview.style.font = "inherit";
    preview.style.overflowWrap = "anywhere";
    const copy = document.createElement("button");
    copy.type = "button";
    copy.textContent = "Copy interest note";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(note);
        copy.textContent = "Copied — paste it into your message";
      } catch {
        const range = document.createRange();
        range.selectNodeContents(preview);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copy.textContent = "Select and copy the highlighted note";
      }
    });
    result.append(intro, preview, copy);
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}