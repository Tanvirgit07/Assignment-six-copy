const loadedData = async() =>{
  const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
  const res = await fetch(url);
  const data = await res.json();
  const posts = data.posts;
  
  setTimeout(() =>{
    getDataOfPosts(posts);
   },2000)
 
}

const getDataOfPosts = (elements) =>{
const postContainer = document.getElementById('post_container')
postContainer.innerHTML = "";
for(const element of elements){
  // console.log(element)
  const postDiv = document.createElement('div')
  postDiv.innerHTML = `
          <div class="lg:flex gap-5 bg-[#797DFC1A] mb-5 lg:p-10 rounded-xl p-4">
          <div>
            <div class="w-24 h-24 rounded-xl relative bg-black">
             <img class="rounded-xl" src="${element.image}" alt="">
              <div id="active" class="w-4 h-4 -right-1 -top-1 rounded-full ${element.isActive ? "bg-green-600" : "bg-red-600"} absolute">
                
              </div>
            </div>
          </div>
          <div id="post_text" class=" lg:w-[800px]">
            <div class="flex gap-8 mb-3">
              <h3 class="text-sm font-medium ">#${element.category}</h3>
              <p class="text-sm font-medium">Author : ${element.author.name}</p>
            </div>
            <h1 class="font-bold text-xl font-mulish mb-3 text-[#12132D]">${element.title}</h1>
            <p class="max-w-md text-base font-normal text-[#12132D99]">${element.description}</p>
            <div class="border-t-2 mt-4 mb-4 border-dashed border-black"></div>
            <div class="flex justify-between">
              <div class="flex items-center gap-5">
                <div class="flex gap-1">
                  <img src="icons/Group 13.png" alt="">
                  <h1>${element.comment_count}</h1>
                </div>
                <div class="flex gap-1">
                  <img src="icons/Group 16.png" alt="">
                  <h1>${element.view_count}</h1>
                </div>
                <div class="flex gap-1">
                  <img src="icons/Group 18.png" alt="">
                  <h1> ${element.posted_time}min</h1>
                </div>
              </div>
              <div>
                <button onclick="marksPart('${element.title}','${element.view_count}')"><img src="icons/Group 40106.png" alt=""></button>
              </div>
            </div>
          </div>
        </div>
  `;
  postContainer.appendChild(postDiv)
};
loadSpinner(false)
}

let count = 0;
const marksPart =async (title,view) =>{
count = count + 1;
const redDiv = document.getElementById('read_div')
const singleRedDiv = document.createElement('div')
const readCount = document.getElementById('read_count');
readCount.innerText = count;
singleRedDiv.innerHTML = `
<div class="flex justify-between bg-[#FFFFFF] p-4 rounded-xl mt-5 items-center">
            <h1>${title}</h1>
            <div class="flex gap-1">
              <img src="icons/Group 16.png" alt="">
              <p>${view}</p>
            </div>
          </div>
`;
redDiv.appendChild(singleRedDiv)
}

const inputValue = () =>{
loadSpinner(true);
const getInput = document.getElementById('Search_input').value;
getCategory(getInput);
}

const getCategory = async(element) =>{
const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${element}`;
const res = await fetch(url);
const data = await res.json();
const getPost = data.posts
 setTimeout(() =>{
  getDataOfPosts(getPost);
 },2000)

// console.log(getPost);
}

const content = document.getElementById('postDiv')
const loadSpinner = (isLoading) =>{
const spinnerLod = document.getElementById('spinner_part')
if(isLoading){
  spinnerLod.classList.remove('hidden')
}
else{
  spinnerLod.classList.add('hidden')
}
}

const latestPart = async() =>{
const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
const res = await fetch(url);
const data = await res.json();
latestCardData(data);

}

const latestCardData = (element) =>{
const latestContainer = document.getElementById('latest_container')
for(const singleLatest of element){
  // console.log(singleLatest);
  const latestDiv = document.createElement('div');
  latestDiv.innerHTML = `
  <div class="max-w-96 mb-5 lg:mb-0 border border-[#12132D26] rounded-xl bg-[#FFFFFF] p-5 h-[490px]">
          <div class="mx-auto mb-6 ">
            <img class="rounded-xl" src="${singleLatest.cover_image}" alt="">
          </div>
          <div class="flex gap-1 mb-3">
            <div class="">
            <img src="icons/calander.png" alt="">
            </div>
            <p class="font-normal text-base text-[#12132D99] font-mulish">${singleLatest.author.posted_date ? singleLatest.author.posted_date : "No posted date"}</p>
          </div>
          <h1 class="mb-3 text-[#12132D] text-lg font-extrabold font-mulish">${singleLatest.title}</h1>
          <p class="mb-4 text-[#12132D99] text-base font-mulish font-normal">${singleLatest.description}</p>
          <div class="flex gap-2 items-center">
            <div class="w-11 h-11">
              <img class="rounded-full" src="${singleLatest.profile_image}" alt="">
            </div>
            <div>
              <h1 class="text-[#12132D] font-bold text-base font-mulish">${singleLatest.author.name}</h1>
              <p class="text-[#12132D99] text-sm font-normal font-mulish">${singleLatest.author.designation ? singleLatest.author.designation : "Unknown"}</p>
            </div>
          </div>
        </div>
  `;
  latestContainer.appendChild(latestDiv);
}
}


loadedData();
latestPart();
