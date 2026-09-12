// Populate the copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Populate the last-modified date using the document object
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;