const gitHubForm = document.getElementById('gitHubForm');


gitHubForm.addEventListener('submit', (e) => {

   
    e.preventDefault();

    
    let usernameInput = document.getElementById('usernameInput');

   
    let gitHubUsername = usernameInput.value;

    
    requestUser(gitHubUsername);

})

let data=0;

function requestUser(username){
    
    
    const xhr = new XMLHttpRequest();
    
   
    const url = `https://api.github.com/users/${username}/repos`;
    
    
    xhr.open('GET', url, true);
    
    
    xhr.onload = function() {
    
        
       
        
   const data = JSON.parse(this.response);
        let root = document.getElementById('user');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }


        if (data.message === "Not Found") {
            let ul = document.getElementById('user');

           
            let li = document.createElement('li');

            
            li.classList.add('list-group-item')
                
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
           
            ul.appendChild(li);
        }

        else {

           
            let ul = document.getElementById('user');
            let p = document.createElement('p');
            p.innerHTML = (`<p><strong>info about user</p>`)
            ul.appendChild(p);
            
               
                let li = document.createElement('li');

               
                li.classList.add('list-group-item')

               
                li.innerHTML = (`
                <p><strong>login:</strong> ${data[0].owner.login}</p>
                <p><strong>Description:</strong> ${data[0].owner.id}</p>
                <p><strong>Github URL:</strong> <a href="${data[0].owner.html_url}">click me</a></p>
                <p><strong>organisational URL:</strong> <a href="${data[0].owner.organizational_url}">click me</a></p>
            `);

               
                ul.appendChild(li);

            

        }
    
     }
           xhr.send();
 }

