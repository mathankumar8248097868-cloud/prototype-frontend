// Add extra screening field
function addScreening() {
    const div = document.createElement("div");
    div.innerHTML = `
        <input placeholder="Diagnosis Name" class="diagnosisName">
        <input placeholder="Patient Count" class="diagnosisValue">
    `;
    document.getElementById("extraScreening").appendChild(div);
}

// Add extra treatment field
function addTreatment() {
    const div = document.createElement("div");
    div.innerHTML = `
        <input placeholder="Treatment Name" class="treatmentName">
        <input placeholder="Patient Count" class="treatmentValue">
    `;
    document.getElementById("extraTreatment").appendChild(div);
}

// Submit form
document.getElementById("form").addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(this);

    // Collect extra screening
    const extraScreening = [];
    document.querySelectorAll("#extraScreening div").forEach(row => {
        const name = row.querySelector(".diagnosisName").value.trim();
        const value = row.querySelector(".diagnosisValue").value.trim();
        if(name && value) extraScreening.push({name, value});
    });
    if(extraScreening.length > 0) {
        formData.append("extraScreening", JSON.stringify(extraScreening));
    }

    // Collect extra treatment
    const extraTreatment = [];
    document.querySelectorAll("#extraTreatment div").forEach(row => {
        const name = row.querySelector(".treatmentName").value.trim();
        const value = row.querySelector(".treatmentValue").value.trim();
        if(name && value) extraTreatment.push({name, value});
    });
    if(extraTreatment.length > 0) {
        formData.append("extraTreatment", JSON.stringify(extraTreatment));
    }

    const response = await fetch("https://prototype-backend-657r.onrender.com/api/report/generate", {
      method: "POST",
      body: formData
    });
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Camp_Report.docx";
    link.click();
});
