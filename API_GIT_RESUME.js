const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUser(gitHubUsername);

})

let data=0;

function requestUser(username){
    
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;
    
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    
    // When request is received
    // Process it here
    xhr.onload = function() {
    
        // Parse API data into JSON
       
        
   const data = JSON.parse(this.response);
        let root = document.getElementById('user');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }


        if (data.message === "Not Found") {
            let ul = document.getElementById('user');

            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');

            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')
                // Create the html markup for each li
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
            // Append each li to the ul
            ul.appendChild(li);
        }

        else {

            // Get the ul with id of of userRepos
            let ul = document.getElementById('user');
            let p = document.createElement('p');
            p.innerHTML = (`<p><strong>info about user</p>`)
            ul.appendChild(p);
            // Loop over each object in data array
                // Create variable that will create li's to be added to ul
                let li = document.createElement('li');

                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item')

                // Create the html markup for each li
                li.innerHTML = (`
                <p><strong>login:</strong> ${data[0].owner.login}</p>
                <p><strong>Description:</strong> ${data[0].owner.id}</p>
                <p><strong>Github URL:</strong> <a href="${data[0].owner.html_url}">click me</a></p>
                <p><strong>organisational URL:</strong> <a href="${data[0].owner.organizational_url}">click me</a></p>
            `);

                // Append each li to the ul
                ul.appendChild(li);

            

        }
    
     }
           xhr.send();
 }

