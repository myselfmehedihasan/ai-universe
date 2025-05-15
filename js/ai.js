console.log("connect ai.js");

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const dataHub = await res.json();
    const data = dataHub.data.tools;
    console.log(data);

    // --- ADDED: Call displayData after data is loaded ---
    displayData(data);
}






const displayData = (data) => {
    
    const dataContainer = document.getElementById('data-container');
    
    // --- ADDED: Check if data exists before iterating ---
    
    data.forEach(singleData => {
        const dataCard = document.createElement('div');
        dataCard.classList = `border border-[#1111111A] p-6 space-y-5 rounded-2xl`;
        dataCard.innerHTML = `
        <div class="space-y-4">
        <img class ="rounded-2xl" src="${singleData?.image || 'no image'} " alt="">
        <h3 class="text-2xl font-semibold">Features</h3>
        <ol class="list-decimal ml-4">
        ${singleData.features.map(feature => `<li>${feature}</li>`).join('') }
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




loadData();