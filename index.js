// you need to grab the seed color and scheme
// 
// package that into a reqeust that can be sent to the colors server
// You need to get a response from the color server
// Save the response from the color server 
// Render the response fro the color server

const seedColorEl = document.getElementById("seed-color")
const schemeEl = document.getElementById("color-scheme")
const btnEl = document.getElementById("btn")
const divEl = document.getElementById("colors")


btnEl.addEventListener("click", function(){
    const userSelections = objectCreation()
    console.log(userSelections.seedColor)
    let hexValueArray = []
    let imageSrcArray = []
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${userSelections.seedColor}&mode=${userSelections.schemeMode}&count=5`)
    .then(res => res.json())
    .then(data => {
    // iterates over every element in the "colors" property 
        for(let color of data.colors){
            hexValueArray.push(color.hex.value)
            imageSrcArray.push(color.image.bare)
            renderColorScheme(imageSrcArray,hexValueArray)
        }   
    })
   
})


// function that creates the userSelectionObject that we pass into the URL as query strings. The object has two properties: the desired seedColor and the desired schemeMode
function objectCreation(){
    // removes the # from the hex code
   const hexValue = seedColorEl.value.replace("#","")
   const userColorSlectionObj = {
        seedColor: hexValue,
        schemeMode: schemeEl.value
    }
   return userColorSlectionObj 
}

    // function that renders the html and hexcode for the returned color scheme
 function renderColorScheme(imageSrcArray, hexValueArray){
     let html = ""
     for (let i = 0; i < hexValueArray.length; i++){
         html += `<div id = "colors">
                <img src = ${imageSrcArray[i]}>
                <p>${hexValueArray[i]}</p>
            </div>`
     }
     divEl.innerHTML = html
 }