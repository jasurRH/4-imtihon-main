const elPerson = document.querySelector(".person__task");
const elPost = document.querySelector(".post__task");
const elComment = document.querySelector(".comment__task");

function renderUsers(arr , node){
    elPerson.innerHTML= "";
    arr.forEach(element => {
        const personItem = document.createElement("li");
        const personUsername = document.createElement("strong");
        const personBox = document.createElement("div");
        const personName = document.createElement("strong");
        const personNumber = document.createElement("span"); 
        const personAddressBox = document.createElement("div");
        const personStreet = document.createElement("span"); 
        const personSuite = document.createElement("span"); 
        const personcity = document.createElement("span"); 
        const personZipCode = document.createElement("span"); 
        const personOfficialBox = document.createElement("div");
        const personCompanyName = document.createElement("p");
        const personCompanyCatchParse = document.createElement("p"); 
        const personCompanyBs = document.createElement("p")
        const personContactBox = document.createElement("div");
        const personPhoneNumber= document.createElement("a"); 
        const personContactLink = document.createElement("span");
        const personGeo = document.createElement("a");  
        const personWebsite = document.createElement("a"); 
        const personEmail = document.createElement("a"); 

        personGeo.setAttribute("href", `https://www.google.com/maps/place/${element.address.geo.lat} , ${element.address.geo.lng}`);
        personGeo.setAttribute("target" ,"_blank");
        personWebsite.setAttribute("href", element.website);
        personWebsite.setAttribute("target" ,"_blank");
        personEmail.setAttribute("href", `mailto:${element.email}`);
        personPhoneNumber.setAttribute("href", `tel:${element.phone}`);
        
        personItem.dataset.id = element.id
        personUsername.setAttribute("class" , "person__username");
        personUsername.textContent = element.username;
        personBox.setAttribute("class" , "person__box");
        personName.setAttribute("class" , "person__name");
        personName.textContent = element.name;
        personNumber.setAttribute("class" , "person__number");
        personNumber.textContent = element.id;
        personAddressBox.setAttribute("class" , "person__address-box");
        personStreet.setAttribute("class" , "person__street");
        personStreet.textContent = element.address.street;
        personSuite.setAttribute("class" , "person__suite");
        personSuite.textContent = element.address.suite;
        personcity.setAttribute("class" , "person__city");
        personcity.textContent = element.address.city;
        personZipCode.setAttribute("class" , "person__zipcode");
        personZipCode.textContent = element.address.zipcode;
        personOfficialBox.setAttribute("class" , "person__official-box");
        personCompanyName.setAttribute("class" , "person__company-name");
        personCompanyName.textContent = element.company.name;
        personCompanyCatchParse.setAttribute("class" , "person__catch-parse");
        personCompanyCatchParse.textContent = element.company.catchPhrase;
        personCompanyBs.setAttribute("class" , "person__company-bs");
        personCompanyBs.textContent = element.company.bs;
        personContactBox.setAttribute("class" , "person__contact-box");
        personPhoneNumber.setAttribute("class" , "person__phone-number");
        personPhoneNumber.textContent = element.phone;
        personContactLink.setAttribute("class" , "person__contact-link");
        personGeo.setAttribute("class" , "person__geo");
        personGeo.textContent = "Geolocation";
        personWebsite.setAttribute("class" , "person-website");
        personWebsite.textContent = "Website";
        personEmail.setAttribute("class" , "person__email");
        personEmail.textContent = element.email;
        
        personItem.appendChild( personUsername);
        personItem.appendChild( personBox);
        personBox.appendChild( personName);
        personBox.appendChild( personNumber);
        personItem.appendChild( personAddressBox);
        personAddressBox.appendChild( personStreet);
        personAddressBox.appendChild( personSuite);
        personAddressBox.appendChild( personcity);
        personAddressBox.appendChild( personZipCode);
        personItem.appendChild( personOfficialBox);
        personOfficialBox.appendChild( personCompanyName);
        personOfficialBox.appendChild( personCompanyCatchParse);
        personOfficialBox.appendChild( personCompanyBs);
        personOfficialBox.appendChild( personContactBox);
        personContactBox.appendChild( personPhoneNumber)  ;
        personContactBox.appendChild( personContactLink);
        personContactLink.appendChild( personGeo);
        personContactLink.appendChild(personWebsite) ;
        personContactLink.appendChild( personEmail);
        
        node.appendChild(personItem);

        personItem.addEventListener("click" , evt =>{
            elPost.innerHTML ="";
            let dateId = evt.target.dataset.id;

            fetch("https://jsonplaceholder.typicode.com/posts").then(resp => resp.json()).then(data =>{
                data.forEach(posts =>{
                    let postsId = posts.userId;
                    if (dateId == postsId) {
                        const elPostItem = document.createElement("li");
                        const elPostTitle = document.createElement("strong");
                        const elPostText = document.createElement("p");

                        elPostItem.setAttribute("class" , "post__item");
                        elPostTitle.setAttribute("class" , "post__title");
                        elPostText.setAttribute("class" , "post__text");

                        elPostTitle.textContent = posts.title;
                        elPostText.textContent = posts.body;
                        elPostItem.dataset.id = postsId;

                        elPostItem.appendChild(elPostTitle);
                        elPostItem.appendChild(elPostText);

                        elPost.appendChild(elPostItem);

                        elPostItem.addEventListener("click" , elem =>{
                            elComment.innerHTML =  "";
                            let commentId = elem.target.dataset.id;

                            fetch("https://jsonplaceholder.typicode.com/comments").then(resp => resp.json()).then(data => {
                                data.forEach(comments => {
                                    if (commentId == comments.postId){
                                        const cmnItem = document.createElement("li")
                                        const cmnTitle = document.createElement("strong");
                                        const cmnLink = document.createElement("a");
                                        const cmnText = document.createElement("p");

                                        cmnItem.setAttribute("class" , "comment__item");
                                        cmnTitle.setAttribute("class" , "comment__title");
                                        cmnTitle.textContent = comments.name;
                                        cmnLink.setAttribute("class" , "person__email");
                                        cmnLink.setAttribute("href" , `mailto:${comments.email}`);
                                        cmnLink.textContent = comments.email
                                        cmnText.setAttribute("class" , "comment__text");
                                        cmnText.textContent = comments.body;

                                        cmnItem.appendChild(cmnTitle)
                                        cmnItem.appendChild(cmnLink);
                                        cmnItem.appendChild(cmnText);

                                        elComment.appendChild(cmnItem)
                                    }
                                })
                            })

                        })
                    }
                })
            })
        })
    });
}
async function users(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    
    renderUsers(data , elPerson)
}

users()