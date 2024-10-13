// files.js

document.addEventListener('DOMContentLoaded', async function() {
  const viewFilesButtons = document.querySelectorAll('.view-files-btn');

  viewFilesButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      const repoName = event.target.dataset.repo;
      const apiUrl = `https://api.github.com/repos/${repoName}/contents`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}` // Use environment variable
          }
        });

        // Display files on a new page or modal
        renderFiles(response.data);
      } catch (error) {
        console.error('Error fetching repository files:', error);
      }
    });
  });

  function renderFiles(files) {
    // Logic to render files in files.html or modal
    // Example: redirect to a new page
    window.location.href = `files.html?files=${encodeURIComponent(JSON.stringify(files))}`;
  }
});
