const lessonBtn = () =>{
    let url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then((respond)=>respond.json())
    .then((data)=>displayLessonBtn(data.data))
}

const displayLessonBtn = (lessons) =>{
     let lessonDivContainer = document.getElementById("lesson-btn-container");
     lessonDivContainer.innerHTML = "";
     lessons.forEach(lesson => {
        let lessonBtnDiv = document.createElement("div");
        lessonBtnDiv.innerHTML = `
       
        <button class="btn btn-outline btn-primary px-6 rounded-md text-lg py-6"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
        `
        lessonDivContainer.append(lessonBtnDiv); 
     });
    
}

lessonBtn();