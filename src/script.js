import { tagCreator } from "./helpers.js";
import {teamsSection, input, users, usersCountInput, button, gameStartButton, userList, gameRestartButton} from "./constant.js";
gameStartButton.style.display = 'none';
userList.forEach((i) => {
    tagCreator("li", users, i)
})


input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

gameRestartButton.addEventListener('click', () => {
  teamsSection.innerHTML= '';
  users.innerHTML = '';
  usersCountInput.classList.remove('disabled');
  gameRestartButton.style.display = 'none';
  gameStartButton.style.display = 'block';
  usersCountInput.setAttribute('enabled', '')
})

button.addEventListener("click", () => {
  const input = document.querySelector(".users_input input");
  if (input.value.trim()) {
    userList.push(input.value.trim());
    tagCreator("li", users, input.value.trim());
    input.value = "";
  }
 
});

let usersCountInOneTeam = 0

usersCountInput.addEventListener('input', () => {
  const count = usersCountInput.value;
  if(count >= 0){
    usersCountInOneTeam = count;
  }else{
    usersCountInput.value = 0;
  }
})

usersCountInput.addEventListener('keypress', function(e){
  if (e.key === 'Enter') {
   
    usersCountInput.classList.add('disabled');
    gameStartButton.style.display = 'block';
    usersCountInput.style.display = 'block';
  }
});



const userRandomizer = () => {
  if(userList){
    return () => {
      let number = 1;
      gameStartButton.style.display = "none";
      gameRestartButton.style.display = "block";
      teamsSection.style.display = 'flex';
      const usersCount = userList.length;
      const teamsCount = Math.ceil(usersCount / usersCountInOneTeam);
      for (let i = 0; i < teamsCount; i++) {
      
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const ul = document.createElement("ul");  
        teamsSection.appendChild(div);
        div.appendChild(h2);
        div.appendChild(ul);
        h2.innerHTML = `Team №${number}`;
  
        for (let i = 1; i <= usersCountInOneTeam; i++) {
          const li = document.createElement("li");
          ul.appendChild(li);
          let randomUserName = getRandomUser(userList.length);
  
          li.innerHTML = randomUserName == undefined ? "" : `${i}.${randomUserName}`;
        } 
        number++;
      }
    };
  }else{
    return;
  }
 
};



function getRandomUser(max) {
  let randomUserIndex = Math.floor(Math.random() * max);
  const selectedUser = userList[randomUserIndex];
  userList.splice(randomUserIndex, 1);
  return selectedUser;
}

const result = userRandomizer();

gameStartButton.addEventListener("click", result)

