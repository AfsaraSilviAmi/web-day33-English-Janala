const lessonBtn = () =>{
    let url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then((respond)=>respond.json())
    .then((data)=>displayLessonBtn(data.data))
}

const loadWordCard = (id) =>{
    let url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((respond)=>respond.json())
    .then((data)=>displayWordCard(data.data))
}

//btn
const displayLessonBtn = (lessons) =>{
     let lessonDivContainer = document.getElementById("lesson-btn-container");
     lessonDivContainer.innerHTML = "";
     lessons.forEach(lesson => {
        let lessonBtnDiv = document.createElement("div");
        lessonBtnDiv.innerHTML = `
       
        <button onclick ="loadWordCard(${lesson.level_no})"class="btn btn-outline btn-primary px-4 rounded-md text-md py-6"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
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
                    <button class="btn bg-[#1A91FF20]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF20]"> <i class="fa-solid fa-volume-high"></i></button>
                   
                </div>
            </div>
        `
    cardDiv.append(card);

    });
}

lessonBtn();