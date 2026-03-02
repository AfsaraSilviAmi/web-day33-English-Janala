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
const displayLessonBtn = (lessons) =>{
     let lessonDivContainer = document.getElementById("lesson-btn-container");
     lessonDivContainer.innerHTML = "";
     lessons.forEach(lesson => {
        let lessonBtnDiv = document.createElement("div");
        lessonBtnDiv.innerHTML = `
       
        <button onclick ="loadWordCard(${lesson.level_no})"class="btn btn-outline btn-primary px-6 rounded-md text-lg py-6"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
        `
        lessonDivContainer.append(lessonBtnDiv); 
     });
    
}

const displayWordCard = (words) =>{
    const cardDiv = document.getElementById("word-container");
    cardDiv.innerHTML="";
    
    words.forEach(word => {
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white p-10 space-y-4 rounded-lg">
                <h2 class="font-bold text-2xl">${word.word}</h2>
                <p class="font-medium">Meaning /Pronunciation</p>
                <h2 class="font-semibold text-2xl text-gray-800">${word.meaning} / ${word.pronunciation}</h2>
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