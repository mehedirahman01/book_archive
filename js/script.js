// Fetch result
const getResult = () => {
    // Get user input
    const searchTextField = document.getElementById('search-text')
    const searchText = searchTextField.value

    // Clear user input
    searchTextField.value = ''

    // Set url dinamically
    const url = `https://openlibrary.org/search.json?q=${searchText}`

    // Fetch and pass data to another function
    fetch(url)
        .then(respose => respose.json())
        .then(data => showResult(data))
}

// Show Result
const showResult = data => {

    // Show number of results 
    const resultTotal = document.getElementById('result-total')
    const count = document.getElementById('count')
    if (data.numFound) {
        count.innerText = data.numFound
    }
    else {
        count.innerText = "No"
    }
    resultTotal.style.display = "block"

    // Show Result
    const searchResultDiv = document.getElementById('search-results')
    searchResultDiv.textContent = ''

    // Slice 20 results only
    const books = data.docs.slice(0, 20)

    // Show each element using for-each loop
    books?.forEach(book => {
        // Create a div
        const div = document.createElement('div')
        div.classList.add('col')

        // Get author(s) list
        const authors = book.author_name

        // Check and set image source
        const bookImageSrc = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : `images/default.png`

        // Set innerhtml
        div.innerHTML = `
        <div class="card h-100">
            <img src="${bookImageSrc}" class="card-img-top img-thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    
                    <h6>Author(s): </h6>
                    ${authors ?
                authors.map(author =>
                    `<p>${author}<p>`
                ).join(", ") : 'Unknown Author'
            }

                    <h6 class="mt-2">Publisher Name: </h6>
                    <p> ${book.publisher[0] ? book.publisher[0] : 'Unknown Publisher'} </p>
                
                    <h6 class="mt-2">First Published: </h6>
                    <p> ${book.first_publish_year ? book.first_publish_year : 'Unknown Publish Time'} </p>
                </div >
        </div >
    `
        searchResultDiv.appendChild(div)
    })
}