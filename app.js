// The SuperheroEntry Class
class SuperheroEntry {
    constructor(superheroName, superheroUniverse, superheroPower) {
        this.superheroName = superheroName;
        this.superheroUniverse = superheroUniverse;
        this.superheroPower = superheroPower;
    }
}

// The SuperheroList Class
class SuperheroList {
    // addSuperhero
    addSuperhero(entry) {
        const listData = document.querySelector(".superhero-list-data");
        const listContainer = document.createElement("ul");
        listContainer.setAttribute("id", "list");

        listContainer.innerHTML += `
        <li>${entry.superheroName}</li>
        <li>${entry.superheroUniverse}</li>
        <li>${entry.superheroPower}</li>
        <i class="fas fa-trash"></i>
        `;

        listData.appendChild(listContainer);
    }
    // clearSuperheroInputs
    clearSuperheroInputs() {
        [document.querySelector("#name").value, 
        document.querySelector("#universe").value,
        document.querySelector("#power").value] = ["", "", ""];
    }
    // validationError function
    validationError() {
        document.querySelector(".validate-error").classList.add("show-validation");
        setTimeout(() => {
            document.querySelector(".validate-error").classList.remove("show-validation");
        }, 2500);
    }
    // validationSuccess function
    validationSuccess() {
        document.querySelector(".validate-success").classList.add("show-validation");
        setTimeout(() => {
            document.querySelector(".validate-success").classList.remove("show-validation");
        }, 1500);
    }
}

// StoreSuperhero Class
class StoreSuperhero {
    // getSuperhero from LS
    static getSuperhero() {
        let superheros;
        if (localStorage.getItem("superheros") === null) {
            superheros = [];
        } else {
            superheros = JSON.parse(localStorage.getItem("superheros"));
        }
        return superheros;
    }
    // addSuperhero to LS
    static addSuperhero(entry) {
        const superherosList = StoreSuperhero.getSuperhero();
        superherosList.push(entry);
        localStorage.setItem("superheros", JSON.stringify(superherosList));
    }
    // displaySuperhero from LS
    static displaySuperhero() {
        const superherosList = StoreSuperhero.getSuperhero();
        superherosList.forEach(superhero => {
            // instantiating SuperheroList Class
            const list = new SuperheroList();
            list.addSuperhero(superhero);
        });
    }
    // removeSuperhero from LS
    static removeSuperhero(clickedSuperhero) {
        const superherosList = StoreSuperhero.getSuperhero();
        superherosList.forEach((superhero, index) => {
            if (superhero.superheroName === clickedSuperhero) {
                superherosList.splice(index, 1);
            }
        });
        localStorage.setItem("superheros", JSON.stringify(superherosList));
    }
}
// ----Events----
document.addEventListener("DOMContentLoaded", StoreSuperhero.displaySuperhero);
// form submission event listener
const form = document.querySelector(".superhero-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let [superheroName, superheroUniverse, superheroPower] = [
        document.querySelector("#name").value, 
        document.querySelector("#universe").value,
        document.querySelector("#power").value
    ];

    // Instantiating SuperheroEntry Class
    const entry = new SuperheroEntry(superheroName, superheroUniverse, superheroPower);

    // Instantiating SuperheroList Class
    const list = new SuperheroList();

    // validating form if one or more input fields are empty
    if (superheroName === "" || superheroUniverse === "" || superheroPower === "") {
        list.validationError();
    } else {
        list.addSuperhero(entry);
        list.clearSuperheroInputs();
        list.validationSuccess();
        // adding superhero to local storage
        StoreSuperhero.addSuperhero(entry);
    }
});

// deleting listed superheroes
const listData = document.querySelector(".superhero-list-data");
listData.addEventListener("click", function (e) {
    if (e.target.className === "fas fa-trash") {
        const trash = e.target.parentNode;
        const clickedSuperhero = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        StoreSuperhero.removeSuperhero(clickedSuperhero);
        trash.remove();
    }
});
