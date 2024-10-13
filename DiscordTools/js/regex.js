async function loadRegexRules() {
            const response = await fetch('regexRules.json');
            const rules = await response.json();
            const regexList = document.getElementById('regex-list');

            rules.forEach(rule => {
                const ruleContainer = document.createElement('div');
                ruleContainer.classList.add('rule-container');

                ruleContainer.innerHTML = `
                    <h2 class="rule-title">${rule.title}</h2>
                    <p>${rule.description}</p>
                    <div class="code-container">
                        <pre><code class="language-regex">${rule.regex}</code></pre>
                        <button class="copy-btn" onclick="copyToClipboard('${rule.regex}')">📑</button>
                    </div>
                    <p><strong>Example:</strong> ${rule.example}</p>
                `;

                ruleContainer.setAttribute('data-category', rule.category);
                regexList.appendChild(ruleContainer);
            });
        }

        function copyToClipboard(regex) {
            const textArea = document.createElement('textarea');
            textArea.value = regex;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Copied to clipboard: ' + regex);
        }

        // Search functionality for regex rules
        document.getElementById('regex-search').addEventListener('input', function() {
            const searchValue = this.value.toLowerCase();
            filterRules(searchValue, document.getElementById('category-filter').value);
        });

        // Category filter functionality
        document.getElementById('category-filter').addEventListener('change', function() {
            const searchValue = document.getElementById('regex-search').value.toLowerCase();
            filterRules(searchValue, this.value);
        });

        function filterRules(searchValue, category) {
            const regexListItems = document.querySelectorAll('.rule-container');

            regexListItems.forEach(item => {
                const title = item.querySelector('.rule-title').textContent.toLowerCase();
                const matchesSearch = title.includes(searchValue);
                const matchesCategory = category ? item.getAttribute('data-category') === category : true;

                item.style.display = matchesSearch && matchesCategory ? '' : 'none';
            });
        }

        // Load regex rules on page load
        loadRegexRules();
