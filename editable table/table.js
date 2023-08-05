const pencilIcon= '<i class="bi bi-pencil-square edit-pencil">';
const checkIcon= '<i class="bi me-1 check-mark bi-check2"></i>'
const cancelIcon= '<i class="bi cancel-mark me-1 bi-x-lg"></i>'
const binIcon= '<i class="bi bi-trash3 delete-bin"></i>'
var tBody=document.getElementById("t-body");
var addDoctor=document.getElementById("add-doctor");
addDoctor.addEventListener("click",addRow)
document.addEventListener('click', handleClick);


doctor1={
    id: 1,
    fullName: "dr Liver Say",
    email: "farouk@gmail.com",
}
doctor2={
    id: 2,
    fullName: "dr Liver Say",
    email: "farouk@gmail.com",
}
doctor3={
    id: 3,
    fullName: "dr Liver Say",
    email: "farouk@gmail.com",
}
// fetch api get data and store it in the doctor list
var doctorList=[];
doctorList.push(doctor1,doctor2,doctor3)
doctorList.forEach(d=>{
    var tr='<tr>\n<td>'+d.id+'</td>\n<td>'+d.fullName+'</td>\n<td>'+d.email+'</td>\n<td><a href="">Edit/See</a></td>\n<td><i class="bi bi-pencil-square edit-pencil"></i> <i class="bi bi-trash3 delete-bin"></i></td>\n</tr>'
    tBody.innerHTML+=tr;
})


function handleClick(event) {
  const clickedElement = event.target;
  
  const clickedHtmlCode = clickedElement.outerHTML.trim();

  if (clickedHtmlCode.includes(pencilIcon)) {
    
    enableEdit(event.target)
  } 
  else if(clickedHtmlCode.includes(checkIcon)){
    
    saveEdit(event.target)
  }
  else if (clickedHtmlCode.includes(cancelIcon)){
    cancelEdit(event.target)
  }
  else if (clickedHtmlCode.includes(binIcon)){
    deleteRow(event.target)
    console.log(doctorList);
  }
}


function enableEdit(pencil){
    
    var tableRow=pencil.closest("tr")
    
    var icons=tableRow.cells[4];
    icons.innerHTML=""
    icons.innerHTML=checkIcon+cancelIcon;

    var fullNameCell=tableRow.cells[1];
    var emailCell=tableRow.cells[2];
    
    var fullNameinput=document.createElement("input");
    fullNameinput.type="text";
    fullNameinput.value=fullNameCell.innerText;
    
    var emailInput=document.createElement("input");
    emailInput.type="text";
    emailInput.value=emailCell.innerText;

    fullNameCell.innerHTML="";
    fullNameCell.appendChild(fullNameinput)
    
    emailCell.innerHTML="";
    emailCell.appendChild(emailInput);
    this.removeEventListener('click', enableEdit);
}

function saveEdit(saveICon) {
    row=saveICon.closest("tr");

    const firstCell = row.cells[1];
    const secondCell = row.cells[2];

    var icons=row.cells[4];
    icons.innerHTML=""
    icons.innerHTML='<i class="bi bi-pencil-square edit-pencil"></i>'+" "+'<i class="bi bi-trash3 delete-bin"></i>'
    // Get the edited values from the input elements
    const editedValue1 = firstCell.querySelector('input').value;
    const editedValue2 = secondCell.querySelector('input').value;
    if(editedValue1.trim()== "" || editedValue2 == ""){
        cancelEdit(saveICon);
        return;
    }
  
    // Update the cell contents with the edited values
    firstCell.innerHTML = editedValue1;
    secondCell.innerHTML = editedValue2;
  
    
  
    // Log the edited row to the console
    var i=doctorList.findIndex(d=>row.cells[0].innerText==d.id)
    doctorList[i].fullName=row.cells[1].innerText;
    doctorList[i].email=row.cells[2].innerText;


  }
function cancelEdit(cancelIcon){
    row=cancelIcon.closest("tr");

    const i=doctorList.findIndex(object=>object.id==row.cells[0].innerHTML)
    

    const firstCell = row.cells[1];
    const secondCell = row.cells[2];

    var icons=row.cells[4];
    icons.innerHTML=""
    icons.innerHTML='<i class="bi bi-pencil-square edit-pencil"></i>'+" "+'<i class="bi bi-trash3 delete-bin"></i>'

  
  
    // Update the cell contents with the edited values
    firstCell.innerHTML = doctorList[i].fullName;
    secondCell.innerHTML = doctorList[i].email;

}
function deleteRow(deleteBin){
    row=deleteBin.closest("tr")
    const i =doctorList.findIndex(d=>row.cells[0].innerText==d.id)
    console.log(i);
     doctorList.splice(i,1);
    row.remove();
}
function addRow(){
   
    var id =0;
    var i;
    do{
        id++;
        i=doctorList.findIndex(d=>d.id==id);
    }
    while(i!=-1)
    tr='<tr>\n<td>'+id+'</td>\n<td>full name</td>\n<td>email</td>\n<td><a href="">Edit/See</a></td>\n<td><i class="bi bi-pencil-square edit-pencil"></i> <i class="bi bi-trash3 delete-bin"></i></td>\n</tr>'
    tBody.innerHTML+=tr;
    doctorList.push({id:id,fullName:"",email:""})
}