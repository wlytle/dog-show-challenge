const DOGS_URL = "http://localhost:3000/dogs";
const table = document.getElementById("table-body");
const form = document.getElementById("dog-form");
document.addEventListener("DOMContentLoaded", () => {
  getDogs();
  table.addEventListener("click", getDogById);
  form.addEventListener("submit", editDog);
});

const getDogs = () => {
  fetch(DOGS_URL)
    .then((res) => res.json())
    .then((data) => showDogs(data))
    .catch((er) => console.log(er.message));
};

const showDogs = (dogs) => {
  for (const dog of dogs) {
    makeDogRow(dog);
  }
};

const makeDogRow = (dog) => {
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  const tdBreed = document.createElement("td");
  const tdSex = document.createElement("td");
  const tdButton = document.createElement("td");
  const btn = document.createElement("BUTTON");

  tdName.textContent = dog.name;
  tdBreed.textContent = dog.breed;
  tdSex.textContent = dog.sex;
  btn.innerText = "Edit";
  btn.dataset.id = dog.id;

  tdButton.appendChild(btn);
  tr.append(tdName, tdBreed, tdSex, tdButton);
  table.appendChild(tr);
};

const getDogById = (e) => {
  if (!e.target.tagName === "BUTTON") {
    return;
  }
  const id = e.target.dataset.id;
  form.dataset.id = id;
  fetch(DOGS_URL + "/" + id)
    .then((res) => res.json())
    .then((data) => fillForm(data));
};

const fillForm = (dog) => {
  form.name.value = dog.name;
  form.breed.value = dog.breed;
  form.sex.value = dog.sex;
};

const editDog = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const breed = e.target.breed.value;
  const sex = e.target.sex.value;
  const id = e.target.dataset.id;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      breed,
      sex,
    }),
  };
  fetch(DOGS_URL + "/" + id, configObj)
    .then((res) => res.json())
    .then((data) => {
      table.innerHTML = "";
      getDogs();
    })
    .catch((error) => console.log(error));
};
