document.addEventListener('DOMContentLoaded', function() {
    const positionSelect = document.getElementById('position');
    const k1Select = document.getElementById('k1');
    const profileSection = document.getElementById('profileSection');
    const jobForm = document.getElementById('jobForm');

    const skills = {
        'Developer': ['JavaScript', 'Python', 'Java', 'C#'],
        'Business Analyst': ['Requirements Analysis', 'Stakeholder Management', 'Business Process Modeling', 'Data Analysis'],
        'Solution Architect': ['Cloud Computing', 'Microservices', 'DevOps', 'Enterprise Architecture']
    };

    positionSelect.addEventListener('change', function() {
        const selectedPosition = positionSelect.value;
        const k1Options = skills[selectedPosition];

        k1Select.innerHTML = ''; // Clear existing options

        k1Options.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill;
            option.textContent = skill;
            k1Select.appendChild(option);
        });
    });

    // Trigger change event to populate K1 options on initial load
    positionSelect.dispatchEvent(new Event('change'));

    jobForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const position = document.getElementById('position').value;
        const k1 = document.getElementById('k1').value;
        const g1 = document.getElementById('g1').value;

        // Make profile section read-only
        Array.from(profileSection.querySelectorAll('input, select')).forEach(input => {
            input.setAttribute('disabled', 'true');
        });

        const response = await fetch(`/search?position=${position}&k1=${k1}&g1=${g1}`);
        const results = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (results.length > 0) {
            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Position</th>
                    <th>K1</th>
                    <th>G1</th>
                    <th>Action</th>
                </tr>
            `;

            results.forEach(job => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${job.Req_Name}</td>
                    <td>${job.Company}</td>
                    <td>${job.Position}</td>
                    <td>${job.K1}</td>
                    <td>${job.G1}</td>
                    <td><button class="apply-button" data-job-id="${job.ID}">Apply</button></td>
                `;
                table.appendChild(row);
            });

            resultsDiv.appendChild(table);

            document.querySelectorAll('.apply-button').forEach(button => {
                button.addEventListener('click', function() {
                    this.textContent = 'Applied';
                    this.setAttribute('disabled', 'true');
                });
            });
        } else {
            resultsDiv.innerHTML = '<p>No matching job requests found.</p>';
        }
    });
});
