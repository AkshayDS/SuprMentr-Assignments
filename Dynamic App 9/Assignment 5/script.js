// Data Structure: Array of Objects
// Each object stores: id, name, marks (array of numbers), average
let students = [];

// DOM Elements
const studentForm = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const markInputs = document.querySelectorAll('.mark-input');
const studentsTbody = document.getElementById('students-tbody');
const emptyState = document.getElementById('empty-state');
const tableContainer = document.getElementById('table-container');
const totalStudentsEl = document.getElementById('total-students');
const classAverageEl = document.getElementById('class-average');

// Helper to generate a unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Function: Calculate Average
const calculateAverage = (marksArray) => {
    if (marksArray.length === 0) return 0;
    const sum = marksArray.reduce((acc, currentMark) => acc + currentMark, 0);
    return sum / marksArray.length;
};

// Function: Update Statistics
const updateStats = () => {
    totalStudentsEl.textContent = `Total Students: ${students.length}`;
    
    if (students.length === 0) {
        classAverageEl.textContent = `Class Average: 0.00`;
        return;
    }
    
    const totalClassSum = students.reduce((acc, student) => acc + student.average, 0);
    const classAvg = totalClassSum / students.length;
    
    classAverageEl.textContent = `Class Average: ${classAvg.toFixed(2)}`;
};

// Function: Render UI Table
const renderTable = () => {
    // Clear existing rows
    studentsTbody.innerHTML = '';
    
    if (students.length === 0) {
        emptyState.classList.remove('hidden');
        tableContainer.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        tableContainer.classList.remove('hidden');
        
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            
            // Add animation class for the newly added student (assuming last element)
            if (index === students.length - 1) {
                tr.classList.add('new-row');
            }
            
            const isPassing = student.average >= 50; // Passing grade threshold
            const statusClass = isPassing ? 'pass' : 'fail';
            const statusText = isPassing ? 'Pass' : 'Fail';
            
            const marksBadges = student.marks.map(m => `<span class="marks-badge">${m}</span>`).join('');
            
            tr.innerHTML = `
                <td><strong>${student.name}</strong></td>
                <td>${marksBadges}</td>
                <td><strong>${student.average.toFixed(2)}</strong></td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-delete" onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            `;
            
            studentsTbody.appendChild(tr);
        });
    }
    
    // Update stats after rendering
    updateStats();
};

// Add Student Form Submit Event
studentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    const name = nameInput.value.trim();
    if (!name) return;
    
    // Collect non-empty mark inputs into an array
    const marks = [];
    markInputs.forEach(input => {
        if (input.value !== '') {
            const val = parseFloat(input.value);
            // Validate mark bounds
            if (!isNaN(val) && val >= 0 && val <= 100) {
                marks.push(val);
            }
        }
    });
    
    // Ensure at least one mark is entered
    if (marks.length === 0) {
        alert("Please enter at least one valid mark between 0 and 100.");
        return;
    }
    
    // Create new student object
    const newStudent = {
        id: generateId(),
        name: name,
        marks: marks,
        average: calculateAverage(marks)
    };
    
    // Add to students array
    students.push(newStudent);
    
    // Reset the form
    studentForm.reset();
    nameInput.focus();
    
    // Update the display
    renderTable();
});

// Function to delete a student (Global scope for inline onclick)
window.deleteStudent = (id) => {
    students = students.filter(student => student.id !== id);
    renderTable();
};

// Initial setup on load
renderTable();
