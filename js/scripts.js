document.addEventListener('DOMContentLoaded', () => {
  fetch('data/courses.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('course-container');

      data.universities.forEach((university, index) => {
        const uniSection = document.createElement('section');
        uniSection.classList.add('mb-5');

        uniSection.innerHTML = `
          <h2 class="mb-3">${university.name} 
            <span class="badge bg-secondary">Rank: ${university.ranking}</span>
          </h2>
          <div class="row">
            ${university.courses.map(course => {
              let modulesHTML = '';

              // ❗ Force all universities (including SLIIT) to display just a list of module titles
              if (Array.isArray(course.modules)) {
                // If SLIIT style (semesters with subjects), flatten and get just titles
                if (course.modules[0]?.semester) {
                  const flatTitles = course.modules.flatMap(sem =>
                    sem.subjects.map(sub => sub.title)
                  );
                  modulesHTML = `
                    <div class="modules mt-3">
                      <h5>Modules:</h5>
                      <ul>
                        ${flatTitles.map(title => `<li>${title}</li>`).join('')}
                      </ul>
                    </div>
                  `;
                } else {
                  // Already in flat string array format
                  modulesHTML = `
                    <div class="modules mt-3">
                      <h5>Modules:</h5>
                      <ul>
                        ${course.modules.map(mod => `<li>${mod}</li>`).join('')}
                      </ul>
                    </div>
                  `;
                }
              }

              return `
                <div class="col-md-12 mb-4" data-aos="fade-up">
                  <div class="card p-4 shadow-sm">
                    <h4>${course.title}</h4>
                    <p>${course.description}</p>
                    ${modulesHTML}
                    <a href="${course.link}" class="btn btn-primary mt-3" target="_blank">Learn More</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;

        container.appendChild(uniSection);
      });

      AOS.init(); // initialize Animate On Scroll
    })
    .catch(error => {
      console.error('Error loading course data:', error);
      const errorMsg = document.createElement('p');
      errorMsg.textContent = "Failed to load course data.";
      container.appendChild(errorMsg);
    });
});
