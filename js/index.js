document.addEventListener("DOMContentLoaded", ()=> {

    url = "http://localhost:3000/monsters/"
    const limit = 50;
    let page = 1;
    // grab the specific nodes
    const monsterDiv = document.querySelector("#monster-container")
    const forwardBtn = document.querySelector("#forward")
    const backBtn = document.querySelector("#back")
    const divForm = document.querySelector("#create-monster")
    
    //create form
    let form = document.createElement("form")
    form.setAttribute("id", "monster-form")
    let inputName = document.createElement("input")
    inputName.setAttribute("id", "name")
    inputName.setAttribute("placeholder", "name...")
    let inputAge = document.createElement("input")
    inputAge.setAttribute("id", "age")
    inputAge.setAttribute("placeholder", "age...")
    let inputDesc = document.createElement("input")
    inputDesc.setAttribute("id", "description")
    inputDesc.setAttribute("placeholder", "description...")
    let submitBtn = document.createElement("button")
    submitBtn.innerText = "Create"
    form.append(inputName, inputAge, inputDesc,submitBtn)
    divForm.append(form)
    
    
    const createForm = document.querySelector("#monster-form")
    
    //GET request monsters and append to page
    function fetchMonsters(page){
        fetch(url+`?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => addFiftyMonsters(monsters))
    }

    fetchMonsters(page)

    //iterate through each monster and add first 50 monsters to page
    function addFiftyMonsters(monsters){
        monsters.forEach(monster => {addMonster(monster)}      )
    }
    

    // create a div for each monster and append to monster container
    function addMonster(monster) {
        let div = document.createElement("div")
        let h2 = document.createElement("h2")
        let h4 = document.createElement("h4")
        let p = document.createElement("p")
        h2.innerText = monster.name
        h4.innerText = `Age: ${monster.age}`
        p.innerText = `Bio: ${monster.description}`
        div.append(h2,h4,p)
        monsterDiv.append(div)
    }

    // load next 50
    forwardBtn.addEventListener("click", ()=>{
        event.preventDefault();
        page++;
        monsterDiv.innerHTML = ""
        fetchMonsters(page);

    })


    // load previous 50
    backBtn.addEventListener("click", ()=> {
        event.preventDefault()
        page = page - 1;
        monsterDiv.innerHTML = ""
        fetchMonsters(page)
    })

    // Post request for form
    createForm.addEventListener("submit", ()=> {
        event.preventDefault()
        const name = document.querySelector("#name").value
        const age = parseInt(document.querySelector("#age").value)
        const desc = document.querySelector("#description").value
        let config = {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: desc,
            })
        }
        fetch(url, config)
        .then(resp => resp.json())
        createForm.reset()
    })

})