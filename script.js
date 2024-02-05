document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const close = document.querySelector(".close");
  const dataForm = document.querySelector(".dataForm");
  const dataList = document.querySelector(".dataList");
  const editDataForm = document.querySelector(".editDataForm");

  const nameInput = document.querySelector("#nameInput");
  const ageInput = document.querySelector("#ageInput");
  const genderInput = document.querySelector("#genderInput");

  const editIndex = document.querySelector("#editIndex");
  const editNameInput = document.querySelector("#editNameInput");
  const editAgeInput = document.querySelector("#editAgeInput");
  const editGenderInput = document.querySelector("#editGenderInput");

  dataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = ageInput.value;
    const gender = genderInput.value;

    if (name !== "" && !isNaN(age) && gender !== "") {
      const user = {
        name: name,
        age: age,
        gender: gender,
      };
      addToLocalStorage(user);
    } else {
      alert("please fill all details correctly");
    }
  });

  //edit form
  editDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let index = editIndex.value.trim();
    const newname = editNameInput.value.trim();
    const newage = editAgeInput.value;
    const newgender = editGenderInput.value;

    if (newname !== "" && !isNaN(newage) && newgender !== "") {
      const storedData = JSON.parse(localStorage.getItem("myRecord")) || [];
      storedData[index].name = newname;
      storedData[index].age = newage;
      storedData[index].gender = newgender;
      localStorage.setItem("myRecord", JSON.stringify(storedData));
      editDataForm.reset();
      modal.style.display = "none";
      loadStoredData();
    } else {
      alert("please fill all details correctly");
    }
  });

  function addToLocalStorage(user) {
    const storedData = JSON.parse(localStorage.getItem("myRecord")) || [];
    storedData.push(user);
    localStorage.setItem("myRecord", JSON.stringify(storedData));
    loadStoredData();

    dataForm.reset();
  }

  loadStoredData();

  function editData() {
    const index = this.dataset.index;
    const storedData = JSON.parse(localStorage.getItem("myRecord")) || [];
    const data = storedData[index];
    editIndex.value = index;
    editNameInput.value = data.name;
    editAgeInput.value = data.age;
    editGenderInput.value = data.gender;
    modal.style.display = "block";
  }

  function deleteData() {
    if (confirm("Are you sure to delete")) {
      const index = this.dataset.index;
      const storedData = JSON.parse(localStorage.getItem("myRecord")) || [];
      storedData.splice(index, 1);
      localStorage.setItem("myRecord", JSON.stringify(storedData));
      loadStoredData();
    }
  }

  //function to close the modal using close btn
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  //function to close the modal window click
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem("myRecord")) || [];
    dataList.innerHTML = "";

    storedData.forEach((value, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${value.name}</td>
              <td>${value.age}</td>
              <td>${value.gender}</td>
              <td><button data-index='${index}'class="btnEdit">Edit</button></td>
              <td><button data-index='${index}'class="btnDelete">Delete</button></td>`;
      dataList.appendChild(row);
    });
    const editBtn = document.querySelectorAll(".btnEdit");
    editBtn.forEach((btn) => {
      btn.addEventListener("click", editData);
    });

    const delBtn = document.querySelectorAll(".btnDelete");
    delBtn.forEach((btn) => {
      btn.addEventListener("click", deleteData);
    });
  }
});
