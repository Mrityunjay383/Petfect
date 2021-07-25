
const list = document.getElementById("list");

//Functions Declaration
function setList(group){
  clearList();
  for(const pet of group){
    const item = document.createElement('li');
    const text = document.createTextNode(pet.name);
    item.appendChild(text);
    list.appendChild(item);
  }
  list.classList.add("boxShadow");
  if(group.length == 0){
    noResult();
  }
}

function clearList(){
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
}

function noResult(){
  const item = document.createElement('li');
  const text = document.createTextNode("Sepecific pet request!!");
  item.appendChild(text);
  list.appendChild(item);
}

function listInOrder(value, searchTerm){
  if(value == searchTerm){
    return 2;
  }else if(value.startsWith(searchTerm)){
    return 1;
  }else if(value.includes(searchTerm)){
    return 0;
  }else{
    return -1;
  }
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  if(inputValue && inputValue.trim().length > 0){
    inputValue = inputValue.trim().toLowerCase();
    setList(pets.filter(pet => {
      return pet.name.toLocaleLowerCase().includes(inputValue);
    }).sort((a, b) => {
      return listInOrder(b.name.toLocaleLowerCase(), inputValue) - listInOrder(a.name.toLocaleLowerCase(), inputValue);
    }));
  }else{
    clearList();
  }
});

list.addEventListener("click", (e) => {
  const clickValue = e.target.innerHTML;
  if(clickValue != "Sepecific pet request!!"){
    searchInput.value = clickValue;
    list.classList.remove("boxShadow");
    clearList();
  }else{
    window.location.replace("/pets/specificRequest");
  }
});
