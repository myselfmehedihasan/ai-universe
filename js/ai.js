console.log("connect ai.js");

let allData = []; // Store all fetched data globally
let isShowAll = false; // Track if showing all

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const dataHub = await res.json();
    allData = dataHub.data.tools;
    // console.log(allData);

    displayData();
}

const displayData = () => {
    const showAllContainer = document.getElementById('show-all-container');
    if (allData.length > 5 && !isShowAll) {
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
        <div onclick="showDetailsHandler('${singleData.id}');" class="rounded-full bg-[#FEF7F7] p-4 hover:bg-red-500 hover:text-white">
        <i class="fa-solid fa-arrow-right"></i>
        </div>
        </div>
        `;
        dataContainer.appendChild(dataCard);
    });
}








const showDetailsHandler = async (id) => {
    // console.log("show details handler");

    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    singleData = data.data;
    console.log(singleData);

    dataDetailsHandler(singleData);
    // show-modal-details.showModal();

}

const dataDetailsHandler = (singleData) => {
    const modalContainer = document.getElementById('modal-container');



    const modalDetails = document.getElementById('show-modal-details');

    modalDetails.innerHTML = `

        <div class="border border-[#EB5757] bg-[#EB57570D] p-8 rounded-lg w-[50%]">
                        <h3>${singleData.description}</h3>
                        <div class="flex justify-between items-center gap-4 text-center mt-4">
                            <div class="border rounded-2xl bg-[#FFFFFF] p-7 w-32 h-24 flex items-center justify-center">
                                <p class="text-[#03A30A] font-bold">${singleData.pricing[0].price} <br> ${singleData.pricing[0].plan} </p>
                            </div>
                            <div class="border rounded-2xl bg-[#FFFFFF] p-7 w-32 h-24 flex items-center justify-center">
                                <p class="text-[#F28927] font-bold">${singleData.pricing[1].price} <br> ${singleData.pricing[1].plan}</p>
                            </div>
                            <div class="border rounded-2xl bg-[#FFFFFF] p-7 w-32 h-24 flex items-center justify-center">
                                <p class="text-[#EB5757] font-bold">${singleData.pricing[2].price} <br> ${singleData.pricing[2].plan}</p>
                            </div>
                        </div>
                        <div class="flex justify-around gap-5 mt-4">
                        <div>
                            <h3 class="font-semibold text-2xl">Features</h3>
                            <ol class="list-disc ml-4 text-[#585858] ">
                                  ${Object.values(singleData.features).map(feature => `
    <li>${feature.feature_name}</li>
  `).join('')}
                                </ol>

                            
                        </div>
                        <div>
                            <h3 class="font-semibold text-2xl">Integrations</h3>
                            <ol class="list-disc ml-4 text-[#585858]">
                               ${singleData.integrations.map(integrations => `<li>${integrations}</li>`).join('')}
                                </ol>
                        </div>
                    </div>
                    </div>
                    <div class="border border-[#E7E7E7] p-8 rounded-lg w-[50%]">
                        <div class=" mb-6 text-center flex justify-center relative">
                        <p class="pt-1 pb-1 pl-1 pr-1 bg-[#EB5757] text-center w-36 rounded-lg text-white absolute  -right-8 -top-8">${singleData.accuracy.score*100}% accuracy</p>
                            <img class="text-center" src="${singleData.image_link
        }" alt="">
                            
                        </div>
                        <div class="text-center space-y-2"><h3 class="text-2xl font-semibold">${singleData.input_output_examples[0].input}</h3>
                        <p class="text-[#585858]">${singleData.input_output_examples[0].output}</p></div>
                    </div>

        `
    modal_container.showModal()


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