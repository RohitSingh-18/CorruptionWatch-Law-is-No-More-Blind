let blockchain = [
    {
        hash: "8f7d3b2e1a9c6f4d",
        previousHash: "0",
        timestamp: "2023-05-01T10:00:00Z",
        data: { type: "Project", name: "City Metro Extension", budget: "$125M" }
    },
    {
        hash: "2a1b3c4d5e6f7g8h",
        previousHash: "8f7d3b2e1a9c6f4d",
        timestamp: "2023-06-15T14:30:00Z",
        data: { type: "Report", projectName: "City Metro Extension", corruptionType: "Bribery", description: "Suspected bribery in contract awarding", proof: "ReportProof.pdf" }
    },
    {
        hash: "9i8h7g6f5e4d3c2b",
        previousHash: "2a1b3c4d5e6f7g8h",
        timestamp: "2023-07-20T09:15:00Z",
        data: { type: "Project", name: "Public School Renovation", budget: "$8.5M" }
    },
    {
        hash: "1a2b3c4d5e6f7g8h",
        previousHash: "9i8h7g6f5e4d3c2b",
        timestamp: "2023-08-05T11:45:00Z",
        data: { type: "Report", projectName: "Public School Renovation", corruptionType: "Fraud", description: "Inflated material costs reported", proof: "CostInflationProof.pdf" }
    },
    {
        hash: "9h8g7f6e5d4c3b2a",
        previousHash: "1a2b3c4d5e6f7g8h",
        timestamp: "2023-09-10T16:20:00Z",
        data: { type: "Project", name: "Hospital Wing Addition", budget: "$45M" }
    }
];

function generateHash() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addBlock(data) {
    const previousHash = blockchain.length > 0 ? blockchain[blockchain.length - 1].hash : "0";
    const newBlock = {
        hash: generateHash(),
        previousHash: previousHash,
        timestamp: new Date().toISOString(),
        data: data
    };
    blockchain.push(newBlock);
    updateBlockchainVisualization();
    return newBlock.hash;  
}

function updateBlockchainVisualization() {
    const container = document.getElementById('blockchain-container');
    container.innerHTML = '';
    blockchain.forEach((block, index) => {
        const blockElement = document.createElement('div');
        blockElement.className = 'blockchain-block';
        blockElement.innerHTML = `
            <div class="block-header">Block: ${block.hash.substring(0, 8)}...</div>
            <div class="block-details">
                <p>Prev: ${block.previousHash.substring(0, 8)}...</p>
                <p>Time: ${new Date(block.timestamp).toLocaleString()}</p>
                <p>Data: ${JSON.stringify(block.data).substring(0, 30)}...</p>
            </div>
        `;
        blockElement.onclick = () => showBlockDetails(block);
        container.appendChild(blockElement);
        
        const left = Math.random() * (container.offsetWidth - 220);
        const top = Math.random() * (container.offsetHeight - 150);
        blockElement.style.left = `${left}px`;
        blockElement.style.top = `${top}px`;
        
        animateBlock(blockElement);
    });
}

function animateBlock(element) {
    const animationDuration = 5000 + Math.random() * 5000; 
    const xMovement = 100 - Math.random() * 200; 
    const yMovement = 100 - Math.random() * 200; 

    element.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xMovement}px, ${yMovement}px)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: animationDuration,
        iterations: Infinity,
        easing: 'ease-in-out',
        direction: 'alternate' 
    });
}

function initBlockchain() {
    updateBlockchainVisualization();
    setInterval(updateBlockchainVisualization, 10000); 
}

function showBlockDetails(block) {
    const modal = document.getElementById('detailsModal');
    document.getElementById('projectTitle').textContent = block.data.name;
    document.getElementById('projectBudget').textContent = block.data.budget;
    document.getElementById('projectTimeline').textContent = block.data.timeline || 'N/A';
    document.getElementById('projectStatus').textContent = block.data.status || 'N/A';
    document.getElementById('projectProgress').textContent = block.data.progress || 'N/A';
    document.getElementById('projectContractor').textContent = block.data.contractor || 'N/A';
    document.getElementById('projectDescription').textContent = block.data.description || 'N/A';

    // Clear existing reports
    const reportsTableBody = document.getElementById('reportsTableBody');
    reportsTableBody.innerHTML = '';

    if (block.data.type === 'Report') {
        reportsTableBody.style.display = 'block';
        reportDetails = [
            {
                date: block.timestamp.slice(0, 10), 
                type: block.data.corruptionType, 
                status: 'Under Investigation'
            }
        ];
        reportDetails.forEach(report => {
            const row = reportsTableBody.insertRow();
            row.insertCell(0).textContent = report.date;
            row.insertCell(1).textContent = report.type;
            row.insertCell(2).textContent = report.status;
            row.insertCell(3).innerHTML = '<button onclick="viewReportDetails()">View</button>';
        });
    } else {
        reportsTableBody.style.display = 'none';
    }

    modal.style.display = 'block';
}

function viewHashDetails(hash) {
    const matchingBlock = blockchain.find(block => block.hash === hash);
    
    if (matchingBlock) {
        const modal = document.getElementById('detailsModal');
        document.getElementById('projectTitle').textContent = `Block: ${matchingBlock.hash.substring(0, 8)}...`;
        
        const detailsTable = document.querySelector('.details-table');
        detailsTable.innerHTML = `
            <tr>
                <th>Hash</th>
                <td>${matchingBlock.hash}</td>
            </tr>
            <tr>
                <th>Previous Hash</th>
                <td>${matchingBlock.previousHash}</td>
            </tr>
            <tr>
                <th>Timestamp</th>
                <td>${new Date(matchingBlock.timestamp).toLocaleString()}</td>
            </tr>
            <tr>
                <th>Data</th>
                <td>${JSON.stringify(matchingBlock.data, null, 2)}</td>
            </tr>
        `;

        // Clear and hide the reports table as it's not relevant for blockchain blocks
        const reportsTableBody = document.getElementById('reportsTableBody');
        reportsTableBody.innerHTML = '';
        document.querySelector('.reports-table').style.display = 'none';

        modal.style.display = 'block';
    } else {
        alert('No matching hash found in the blockchain.');
    }
}

// Add this function to handle viewing report details
function viewReportDetails(button) {
    const report = JSON.parse(button.parentNode.dataset.report);
    alert(`Report Details:
Date: ${report.date}
Type: ${report.corruptionType}
Description: ${report.description}
Proof: ${report.proof}
Status: ${report.status}`);
}

function showPreview(section) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');

    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    if (section === 'blockchain') {
        initBlockchain();
    }
}

function showReportForm(projectName) {
    document.getElementById('reportProjectName').value = projectName;
    document.getElementById('reportModal').style.display = 'block';
}

document.getElementById('reportCorruptionForm').onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const reportData = {
        date: new Date().toISOString().split('T')[0],
        type: 'Report',
        corruptionType: formData.get('corruptionTypeGeneral'),
        description: formData.get('descriptionGeneral'),
        proof: formData.get('proofGeneral') ? formData.get('proofGeneral').name : 'No file uploaded'
    };
    
    const newHash = addBlock(reportData);

    document.getElementById('generatedHashCode').textContent = newHash;
    document.getElementById('hashCodeModal').style.display = 'block';

    this.reset();
};

// Add this function to handle adding a new project
function addNewProject(projectData) {
    const projectsGrid = document.querySelector('.projects-grid');
    const newProjectCard = document.createElement('div');
    newProjectCard.className = 'project-card';
    newProjectCard.dataset.name = projectData.name;
    newProjectCard.dataset.budget = projectData.budget;
    newProjectCard.dataset.timeline = projectData.timeline;
    newProjectCard.dataset.status = 'Ongoing';
    newProjectCard.dataset.progress = '0%';
    newProjectCard.dataset.category = projectData.category;
    newProjectCard.dataset.contractor = 'TBD';
    newProjectCard.dataset.description = projectData.description;
    newProjectCard.dataset.reports = JSON.stringify([]); // Initialize empty reports array

    newProjectCard.innerHTML = `
        <div class="project-header">
            <h3>${projectData.name}</h3>
            <div class="status-category">
                <span class="status ongoing">Ongoing</span>
                <span class="category">${projectData.category}</span>
            </div>
        </div>
        <div class="project-details">
            <p><strong>Budget:</strong> ${projectData.budget}</p>
            <p><strong>Timeline:</strong> ${projectData.timeline}</p>
            <p><strong>Progress:</strong> 0%</p>
            <div class="progress-bar">
                <div class="progress" style="width: 0%;"></div>
            </div>
        </div>
        <div class="project-footer">
            <button class="view-details" onclick="showProjectDetails('${projectData.name}')">View Details</button>
            <button class="report-issue" onclick="showReportForm('${projectData.name}')">Report Issue</button>
        </div>
    `;

    projectsGrid.appendChild(newProjectCard);
}

// Update the addProjectForm submission handler
document.getElementById('addProjectForm').onsubmit = function(e) {
    e.preventDefault();
    const projectData = {
        name: document.getElementById('projectName').value,
        budget: document.getElementById('projectBudget').value,
        timeline: document.getElementById('projectTimeline').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value
    };

    addNewProject(projectData);
    addBlock({ type: 'Project', ...projectData });

    alert('New project added successfully!');
    closeModal('addProjectModal');
    this.reset();
    showPreview('projects');
};

// Modify the showProjectDetails function
function showProjectDetails(projectName) {
    const projectCard = document.querySelector(`.project-card[data-name="${projectName}"]`);
    if (!projectCard) {
        alert('Project not found');
        return;
    }

    const modal = document.getElementById('detailsModal');
    document.getElementById('projectTitle').textContent = projectName;
    document.getElementById('projectBudget').textContent = projectCard.dataset.budget;
    document.getElementById('projectTimeline').textContent = projectCard.dataset.timeline;
    document.getElementById('projectStatus').textContent = projectCard.dataset.status;
    document.getElementById('projectProgress').textContent = projectCard.dataset.progress;
    document.getElementById('projectContractor').textContent = projectCard.dataset.contractor;
    document.getElementById('projectDescription').textContent = projectCard.dataset.description;

    // Display reports
    const reportsTableBody = document.getElementById('reportsTableBody');
    reportsTableBody.innerHTML = '';

    const reports = JSON.parse(projectCard.dataset.reports || '[]');
    if (reports.length > 0) {
        document.querySelector('.reports-table').style.display = 'table';
        reports.forEach(report => {
            const row = reportsTableBody.insertRow();
            row.insertCell(0).textContent = report.date;
            row.insertCell(1).textContent = report.corruptionType;
            row.insertCell(2).textContent = report.status;
            const actionCell = row.insertCell(3);
            actionCell.innerHTML = '<button onclick="viewReportDetails(this)">View</button>';
            actionCell.dataset.report = JSON.stringify(report);
        });
    } else {
        document.querySelector('.reports-table').style.display = 'none';
    }

    modal.style.display = 'block';
}

function copyHashCode() {
    const hashCode = document.getElementById('generatedHashCode').textContent;
    navigator.clipboard.writeText(hashCode).then(() => {
        alert('Hash code copied to clipboard!');
    });
}

function saveHashCode() {
    const hashCode = document.getElementById('generatedHashCode').textContent;
    let savedHashes = JSON.parse(localStorage.getItem('savedHashes')) || [];
    savedHashes.push(hashCode);
    localStorage.setItem('savedHashes', JSON.stringify(savedHashes));
    alert('Hash code saved successfully!');
    closeModal('hashCodeModal');
    showMyReports(); // Update the My Reports page
}

function showMyReports() {
    const savedHashes = JSON.parse(localStorage.getItem('savedHashes')) || [];
    const container = document.getElementById('savedHashesContainer');
    container.innerHTML = '';
    
    if (savedHashes.length === 0) {
        container.innerHTML = '<p>No saved hash codes yet.</p>';
    } else {
        savedHashes.forEach(hash => {
            const hashElement = document.createElement('div');
            hashElement.className = 'saved-hash';
            hashElement.innerHTML = `
                <span>${hash}</span>
                <button onclick="viewHashDetails('${hash}')">View Details</button>
                <button onclick="deleteHash('${hash}')" class="delete-btn">Delete</button>
            `;
            container.appendChild(hashElement);
        });
    }
}

function deleteHash(hash) {
    let savedHashes = JSON.parse(localStorage.getItem('savedHashes')) || [];
    savedHashes = savedHashes.filter(h => h !== hash);
    localStorage.setItem('savedHashes', JSON.stringify(savedHashes));
    showMyReports(); // Refresh the display
    alert('Hash code deleted successfully!');
}

document.getElementById('reportForm').onsubmit = function(e) {
    e.preventDefault();
    const projectName = document.getElementById('reportProjectName').value;
    const corruptionType = document.getElementById('corruptionType').value;
    const description = document.getElementById('description').value;
    const proof = document.getElementById('proof').files[0] ? document.getElementById('proof').files[0].name : 'No file uploaded';

    const reportData = { 
        date: new Date().toISOString().split('T')[0],
        corruptionType, 
        description, 
        proof,
        status: 'Under Investigation'
    };

    // Add report to the project's reports array
    const projectCard = document.querySelector(`.project-card[data-name="${projectName}"]`);
    if (projectCard) {
        let reports = JSON.parse(projectCard.dataset.reports || '[]');
        reports.push(reportData);
        projectCard.dataset.reports = JSON.stringify(reports);
    }

    addBlock({ type: 'Report', projectName, ...reportData });

    alert('Thank you for your report. It has been submitted for review and added to the blockchain.');
    closeModal('reportModal');
    this.reset();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function searchHash() {
    const searchInput = document.getElementById('hashSearch').value;
    const matchingBlock = blockchain.find(block => block.hash === searchInput);
    
    const detailsContainer = document.getElementById('hashDetailsContainer');
    
    if (matchingBlock) {
        detailsContainer.innerHTML = `
            <h3>Block Details</h3>
            <table class="details-table">
                <tr>
                    <th>Hash</th>
                    <td>${matchingBlock.hash}</td>
                    <td><button onclick="copyToClipboard('${matchingBlock.hash}')">Copy</button></td>
                </tr>
                <tr>
                    <th>Previous Hash</th>
                    <td>${matchingBlock.previousHash}</td>
                    <td><button onclick="copyToClipboard('${matchingBlock.previousHash}')">Copy</button></td>
                </tr>
                <tr>
                    <th>Timestamp</th>
                    <td>${new Date(matchingBlock.timestamp).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Data</th>
                    <td>${JSON.stringify(matchingBlock.data, null, 2)}</td>
                </tr>
            </table>
        `;
    } else {
        detailsContainer.innerHTML = '<p>No matching hash found.</p>';
    }
}

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

function showAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const addProjectLink = document.querySelector('.add-project-link');

    addProjectLink.addEventListener('click', function(e) {
        e.preventDefault();
        const isGovernmentOfficial = confirm('Are you a government official?');
        if (isGovernmentOfficial) {
            const password = prompt('Please enter the password:');
            if (password === '1234') {
                showAddProjectModal();
            } else {
                alert('Incorrect password. Access denied.');
            }
        } else {
            alert('Access restricted. Only government officials can add new projects.');
        }
    });
    
    const myReportsLink = document.querySelector('a[onclick="showPreview(\'myReports\')"]');
    myReportsLink.addEventListener('click', showMyReports);
});
