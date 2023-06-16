let activityData = [];
let isEdit = false;
let rowIndex;

function updateStatusOptions() {
  const start_date = new Date(document.getElementById("start_date").value);
  const end_date = new Date(document.getElementById("end_date").value);
  const task_status = document.getElementById("task_status");

  const today = new Date();

  if (start_date < today && end_date < today) {
    task_status.innerHTML = `
          <option value="Completed">Completed</option>
          <option value="Due Passed">Due Passed</option>
      `;
  } 
  
 else {
    task_status.innerHTML = `
          <option value="Started">Started</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Due Passed">Due Passed</option>
      `;
  }
}

function onFormSubmit() {
  document.getElementById("message").innerHTML="";
  const activityInput = document.getElementById("activity");
  const startDateInput = document.getElementById("start_date");
  const endDateInput = document.getElementById("end_date");
  const statusInput = document.getElementById("task_status");
  // const activityError = document.getElementById("activity_error");
  // const startDateError = document.getElementById("startdate_error");
  const endDateError = document.getElementById("enddate_error");
  // const statusError = document.getElementById("status_error");

  // activityError.classList.add("hide");
  // startDateError.classList.add("hide");
  endDateError.classList.add("hide");
  // statusError.classList.add("hide");

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  function errordate() {
    if (startDate > endDate) {
      endDateError.classList.remove("hide");
      deleteActivity(i);
      return;
    }
  }
  errordate(); //it calls error date function

  //object for storing activity data

  const activity = { 
    activity: activityInput.value,
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    status: statusInput.value,
  };

  // Add or Update the activity to the array
  if (!isEdit) {
    activityData.push(activity);
  } else {
    activityData[rowIndex] = activity;
    isEdit = false
  }

  // Clear the form inputs
  activityInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  statusInput.value = "";
  // Refresh the activity list
  displayActivityList();
}

function displayActivityList() {
  const tableBody = document.querySelector('#activity_list tbody');
  tableBody.innerHTML = '';

  // Get the current date
  var currentDate = new Date();

  // Loop through the activity data and create table rows
  for (let i = 0; i < activityData.length; i++) {
    const activity = activityData[i];

    const row = document.createElement('tr');

    // Function to display activity
    function disp_act() {
      const activityCell = document.createElement('td');
      activityCell.textContent = activity.activity;
      row.appendChild(activityCell);

      const startDateCell = document.createElement('td');
      startDateCell.textContent = activity.startDate;
      row.appendChild(startDateCell);
      w
      const endDateCell = document.createElement('td');
      endDateCell.textContent = activity.endDate;
      row.appendChild(endDateCell);

      const statusCell = document.createElement('td');
      statusCell.textContent = activity.status;
      row.appendChild(statusCell);

      if (activity.status == 'Completed') {
        statusCell.style.backgroundColor = 'green';
      
        statusCell.style.color = 'white';
      } else if (activity.status == 'Due Passed') {
        statusCell.style.backgroundColor = 'red';
        statusCell.style.color = 'white';
      }

    }


    disp_act();

    const actionCell = document.createElement('td');

    if (new Date(activity.endDate) < currentDate) {
      row.classList.add('strikethrough');
    } else {
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');
      editButton.addEventListener('click', () => {
        editActivity(i);
      });
      actionCell.appendChild(editButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      deleteActivity(i);
    });
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);
    tableBody.appendChild(row);
  }
}

// Function to delete an activity
function deleteActivity(index) {
  document.getElementById("message").innerHTML="";
  
  activityData.splice(index, 1);

  displayActivityList();
}

// Function to edit an activity
function editActivity(index) {
  document.getElementById("message").innerHTML="Editing TODO List";
  isEdit = true;
  rowIndex = index;
  const activity = activityData[index];
  const activityInput = document.getElementById("activity");
  const startDateInput = document.getElementById("start_date");
  const endDateInput = document.getElementById("end_date");
  const statusInput = document.getElementById("task_status");
  console.log(statusInput);

  // Set the form inputs to the values of the selected activity
  activityInput.value = activity.activity;
  startDateInput.value = activity.startDate;
  endDateInput.value = activity.endDate;
  statusInput.value = activity.status;

}

function searchFunction() {
  const searchInput = document.getElementById("search");
  const filter = searchInput.value.toLowerCase();

  const rows = document.getElementById("activity_list").getElementsByTagName("tr");

  // it Loops through all the rows and hide those that don't match the search query
  for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
           let shouldHideRow = true;

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      if (cell.textContent.toLowerCase().indexOf(filter) > -1) { //if value is greater than -1 then it mathes the search query
        shouldHideRow = false;
        break;
      }
    }
    if (shouldHideRow) {
      rows[i].style.display = "none";
    } else {
      rows[i].style.display = "";
    }
  }
}
displayActivityList();
