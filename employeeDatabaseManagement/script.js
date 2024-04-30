(async function () {
  const data = await fetch("data.json");
  const res = await data.json();
  console.log(res);
  let employees = res;
  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];
  console.log(selectedEmployeeId);

  const employeeList = document.querySelector(".employee-list");
  const employeeDetails = document.querySelector(".employee-details");

  // logic to fetch user details on click
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId != e.target.id) {
      selectedEmployeeId = e.target.id;

      renderEmployeesList();
      // Render Employee Details
      renderSingleEmployeeDetails();
    }

    // when cross is clicked
    if (e.target.tagName == "I") {
      employees = employees.filter(
        (emp) => String(emp.id) != e.target.parentNode.id
      );
      if (String(selectedEmployeeId) == e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployeeDetails();
      }
      renderEmployeesList();
    }
  });

  // logic to add user
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", (e) => {
    addEmployeeModal.style.display = "flex";
  });
  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className == "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });
  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}- ${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //
    const formData = new FormData(addEmployeeForm);

    const values = [...formData.entries()];
    console.log(values);
    let empData = {};
    values.forEach((value) => {
      empData[value[0]] = value[1];
    });
    empData.id = employees[employees.length - 1]?.id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployeesList();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  function renderEmployeesList() {
    employeeList.innerHTML = "";
    employees.forEach((employee) => {
      const emp = document.createElement("span");
      emp.classList.add("employees-list-data");
      if (parseInt(selectedEmployeeId, 10) == employee.id) {
        emp.classList.add("selected");
        selectedEmployee = employee;
        console.log(selectedEmployee);
      }
      emp.setAttribute("id", employee.id);
      emp.innerHTML = `${employee.firstName} ${employee.lastName} <i class="delete-icon">X</i>`;
      employeeList.append(emp);
    });
  }
  renderEmployeesList();

  // employee Details
  function renderSingleEmployeeDetails() {
    if (selectedEmployeeId == -1) {
      employeeDetails.innerHTML = "No Employees Found";
      return;
    }
    employeeDetails.innerHTML = `
      <img src="${selectedEmployee.imageUrl}" />
      <span class="employees__single--heading">
      ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
      </span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.contactNumber}</span>
      <span>DOB - ${selectedEmployee.dob}</span>
    `;
  }
  if (selectedEmployee) {
    renderSingleEmployeeDetails();
  }
})();
