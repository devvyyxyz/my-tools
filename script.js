document.addEventListener('DOMContentLoaded', function() {
  const projectList = document.getElementById('projectList');
  const categorySelect = document.getElementById('category');
  const itemsPerPageSelect = document.getElementById('itemsPerPage');
  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');

  let projects = {}; // Object to hold projects data categorized by type
  let currentPage = 1;
  let itemsPerPage = parseInt(itemsPerPageSelect.value);

  // Function to fetch projects from subfolders
  async function fetchProjects() {
    try {
      const response = await fetch('projects.json');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projectFolders = await response.json();
      if (!Array.isArray(projectFolders)) {
        throw new TypeError('Fetched data is not an array');
      }
      projects = await loadProjectsFromFolders(projectFolders);
      populateCategoryDropdown(); // Populate category dropdown after fetching projects
      updateProjects(); // Update projects immediately on load
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  // Function to load projects from folders
  async function loadProjectsFromFolders(folders) {
    const projects = {};
    for (const folder of folders) {
      const response = await fetch(`${folder}/project.json`);
      if (response.ok) {
        const projectData = await response.json();
        const category = projectData.category || 'uncategorized';
        if (!projects[category]) {
          projects[category] = [];
        }
        projects[category].push({
          name: projectData.name,
          file: `${folder}/${projectData.file}`
        });
      }
    }
    return projects;
  }

  // Function to populate category dropdown with options
  function populateCategoryDropdown() {
    Object.keys(projects).forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
      categorySelect.appendChild(option);
    });
  }

  // Function to update projects based on current category and page
  function updateProjects() {
    const selectedCategory = categorySelect.value;
    const projectsToDisplay = getProjectsByCategory(selectedCategory);
    renderProjects(projectsToDisplay);
  }

  // Function to get projects based on selected category
  function getProjectsByCategory(category) {
    if (category === 'all') {
      return getAllProjects();
    } else {
      return projects[category] || [];
    }
  }

  // Function to get all projects from all categories
  function getAllProjects() {
    let allProjects = [];
    Object.keys(projects).forEach(category => {
      allProjects = allProjects.concat(projects[category]);
    });
    return allProjects;
  }

  // Function to render project cards
  function renderProjects(projectsData) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProjects = projectsData.slice(startIndex, endIndex);

    projectList.innerHTML = '';
    paginatedProjects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <div>
          <h3>${project.name}</h3>
          <p>Category: ${categorySelect.value}</p>
        </div>
        <div>
          <a href="${project.file}" target="_blank">View Project</a>
          <a href="files.html?repo=${encodeURIComponent(project.file)}" class="view-files">View Files</a>
        </div>
      `;
      projectList.appendChild(card);
    });

    updatePaginationInfo(projectsData.length);
  }

  // Function to update pagination information (current page, total pages)
  function updatePaginationInfo(totalProjectsCount) {
    const totalPages = Math.ceil(totalProjectsCount / itemsPerPage);
    totalPagesSpan.textContent = totalPages;
    currentPageSpan.textContent = currentPage;

    // Disable/enable pagination buttons based on current page
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
  }

  // Event listener for category select change
  categorySelect.addEventListener('change', () => {
    currentPage = 1; // Reset to first page when category changes
    updateProjects();
  });

  // Event listener for items per page change
  itemsPerPageSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1; // Reset to first page when items per page changes
    updateProjects();
  });

  // Event listener for previous page button click
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updateProjects();
    }
  });

  // Event listener for next page button click
  nextPageBtn.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    const projectsToDisplay = getProjectsByCategory(selectedCategory);
    const totalPages = Math.ceil(projectsToDisplay.length / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      updateProjects();
    }
  });

  // Initial fetch of projects when DOM content is loaded
  fetchProjects();
});