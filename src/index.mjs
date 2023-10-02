(async function(){
  const data = await fetch('./src/data.json');
  const res = await data.json();
  const employees = res;
  const employeeList = document.querySelector(".employee-list");
  let employee_info_page = document.querySelector(".employee-info");
  let selected_employee_id = employees[0].id;
  const addEmployee = document.querySelector(".add-employee");
  const addModal = document.querySelector(".add-modal");
  const addEmployeeForm = document.querySelector(".add-employee-form");

  addEmployee.addEventListener("click",() =>{
    addModal.style.display = "inherit";
  })

  addModal.addEventListener("click",(e) => {
    if(e.target.className === "add-modal"){
      addModal.style.display = "none";
    }
  })

  addEmployeeForm.addEventListener("submit",(e) =>{
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()]
    addValues(values);
    render();
    employee_info_render();
    addModal.style.display = "none";
  });

  const render = () =>{
    employeeList.innerHTML="";
    employees.forEach(emp => {
      const employee = document.createElement("div");
      employee.classList.add("employee-single-list");
      employee.setAttribute("id",emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName}`;
      employeeList.append(employee);
      if(emp.id === selected_employee_id){
        employee.style.backgroundColor = "green";
      }
    });
  }

  employeeList.addEventListener("click",(e) => {
    if(e.target.className === "employee-single-list" && selected_employee_id !== e.target.id){
      selected_employee_id = parseInt(e.target.id,10);
      render();
      employee_info_render();
    }
  })

  const employee_info_render = () =>{
    employee_info_page.innerHTML = "";
    employees.forEach(emp => {
      if(emp.id === selected_employee_id){
        const employee_details = document.createElement("div");
        employee_details.classList.add("employee-info-page");
        employee_details.innerHTML = 
        `<div>
          <img src=${emp.imageUrl} width="100" height="150" />
          <div class=${"employee-title"}>${emp.firstName} ${emp.lastName} (${emp.age})</div>
          <div class="employee-second">
            <div>${emp.address}</div>
            <div>${emp.email}</div>
            <div>Mobile - ${emp.contactNumber}</div>
            <div>DOB - ${emp.dob}</div>
          </div>
        </div>`;
        employee_info_page.append(employee_details);
      }
    })
  }

  const formatDate = (dateString) =>{
    return dateString.split("-").reverse().join("/");
  }

  const calculateAge = (date) => {
    const year = date.split("/")[2];
    return 2023 - year;
  }

  const addValues = (values) =>{
    const lastId = employees[employees.length - 1].id;
    const newId = lastId + 1;
    const date = formatDate(values[7][1]);
    const age = calculateAge(date);
    const newValue = {
      "id": newId,
      "imageUrl":values[2][1] ,
      "firstName": values[0][1],
      "lastName": values[1][1],
      "email": values[3][1],
      "contactNumber": values[4][1],
      "age": age,
      "dob": date,
      "salary": values[6][1],
      "address": values[5][1]
    }
    employees.push(newValue);
  }

  render();
  employee_info_render();
})()

