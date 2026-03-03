const createElement = (arr)=>{
    let htmlElement = arr.map((el) =>` <span class="bg-blue-200 p-2 rounded-lg">${el}</span>` );
    return htmlElement.join(" ");
}

const lessonBtn = () =>{
    let url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then((respond)=>respond.json())
    .then((data)=>displayLessonBtn(data.data))
}
//for the toggle color change
//1.we set an unique id on the lesson buttons using level_no
//2.we go to the loadWordCard function and get that id
//3.Then we add the active class and write the active class CSS in the stylesheet
//4.To remove the active class we create a function called removeActive where we select all button by class name 
//5.For each button we remove the active class...so that only the selected id is only active

//removing active class function--
const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".less-btn");
    lessonButtons.forEach(btn => {
        btn.classList.remove("active")
    });
}
const loadWordCard = (id) =>{
    let url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((respond)=>respond.json())
    .then((data)=>{
        removeActive(); //remove all active class
        const clickBtn = document.getElementById(`less-btn-${id}`);
        clickBtn.classList.add("active"); // add active class
        displayWordCard(data.data)
    })
}
//Word Details in info

const loadWordDetail = (id)=>
{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        displayWordDetail(data.data);
    })
}
//display word Detail

const displayWordDetail = (word) =>{
    const detailDiv = document.getElementById("details-container");
    detailDiv.innerHTML = `
       <div class="space-y-4">
        <div>
        <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>${word.pronunciation})</h2>
      </div>
       <div>
        <p class="font-semibold text-lg">Meaning</p>
        <p class="font-medium">${word.meaning}</p>
       </div>
       <div>
        <p class="font-semibold text-lg">Example</p>
        <p class="text-gray-700">${word.sentence}</p>
       </div>
       <div class=mb-5>
        <p class="font-semibold text-lg mb-4">সমার্থক শব্দ গুলো</p>
         <div>
          ${word.synonyms ? createElement(word.synonyms): "No Synonyms are found"}
         <div>
       </div>
       </div>
    `;
    document.getElementById("myModal").showModal();
}
//btn
const displayLessonBtn = (lessons) =>{
     let lessonDivContainer = document.getElementById("lesson-btn-container");
     lessonDivContainer.innerHTML = "";
     lessons.forEach(lesson => {
        let lessonBtnDiv = document.createElement("div");
        lessonBtnDiv.innerHTML = `
       
        <button id="less-btn-${lesson.level_no}" onclick ="loadWordCard(${lesson.level_no})" class="btn btn-outline btn-primary px-4 rounded-md text-md py-6 less-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
        `
        lessonDivContainer.append(lessonBtnDiv); 
     });
    
}

//card
const displayWordCard = (words) =>{
    const cardDiv = document.getElementById("word-container");
    cardDiv.innerHTML="";
    if(words.length == 0){
        cardDiv.innerHTML=`
          <div class="col-span-full space-y-5 p-8">
               <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p class="font-bangla text-[#79716B] text-lg">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-bangla text-4xl">নেক্সট Lesson এ যান</h1>
            </div>
        `;
    }
    words.forEach(word => {
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white p-10 space-y-4 rounded-lg">
                <h2 class="font-bold text-2xl">${word.word? word.word: "No words found"}</h2>
                <p class="font-medium">Meaning /Pronunciation</p>
                <h2 class="font-semibold text-2xl text-gray-800 font-bangla">"${word.meaning? word.meaning:"Meaning not found"} / ${word.pronunciation? word.pronunciation: "Pronunciation not found"}"</h2>
                <div class="flex justify-between">
                    <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1A91FF20] wordDetail"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF20]"> <i class="fa-solid fa-volume-high"></i></button>
                   
                </div>
            </div>
        `
    cardDiv.append(card);

    });
}


lessonBtn();