console.log("connect ai.js");

let allData = []; // Store all fetched data globally
let isShowAll = false; // Track if showing all

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const dataHub = await res.json();
    allData = dataHub.data.tools;
    console.log(allData);

    displayData();
}

const displayData = () => {
    const showAllContainer = document.getElementById('show-all-container');
    if (allData.length > 5 && !isShowAll){
        showAllContainer.classList.remove("hidden");
    } else {
        showAllContainer.classList.add("hidden");
    }

    // Show 6 or all based on isShowAll
    let displayItems = isShowAll ? allData : allData.slice(0, 6);

    const dataContainer = document.getElementById('data-container');
    // Do NOT clear dataContainer.innerHTML
    dataContainer.innerHTML = "";

    displayItems.forEach(singleData => {
        const dataCard = document.createElement('div');
        dataCard.classList = `border border-[#1111111A] p-6 space-y-5 rounded-2xl`;
        dataCard.innerHTML = `
        <div class="space-y-4">
        <img class ="rounded-2xl" src="${singleData?.image || 'no image'} " alt="">
        <h3 class="text-2xl font-semibold">Features</h3>
        <ol class="list-decimal ml-4">
        ${singleData.features.map(feature => `<li>${feature}</li>`).join('')}
        </ol>
        </div>
        <hr>
        <div class="flex justify-between items-center">
        <div>
        <h3 class="text-2xl font-semibold mb-3">${singleData.name}</h3>
        <i class="fa-solid fa-calendar-days"></i> ${singleData.published_in}
        </div>
        <div onclick="" class="rounded-full bg-[#FEF7F7] p-4 hover:bg-red-500 hover:text-white">
        <i class="fa-solid fa-arrow-right"></i>
        </div>
        </div>
        `;
        dataContainer.appendChild(dataCard);
    });
}

const showAllHandler = () => {
    console.log("connected show all handle");
    isShowAll = true;
    displayData();
}



const dateSortHandler = () => {
    console.log("connected date sort handler");
    allData.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    displayData();

}


loadData();