var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var searchInput = document.getElementById('searchBookmark')

var allBookmark = []

if (localStorage.getItem('myBookmarks') != null) {
    allBookmark = JSON.parse(localStorage.getItem('myBookmarks'))
    displayBookmark(allBookmark)
}

function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value,
    }

    allBookmark.push(bookmark)

    localStorage.setItem('myBookmarks', JSON.stringify(allBookmark))

    displayBookmark(allBookmark)
    clearForm()
    clearValidation()
}

function displayBookmark(list) {
    var container = ``

    for (var i = 0; i < list.length; i++) {
        container += `
        <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><a href='${list[i].url}' target="_blank" class="btn btn-visit text-decoration-none">
        <i class="fa-solid fa-eye "></i>
        Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }

    document.getElementById('tbody').innerHTML = container;

}

function clearForm() {
    siteName.value = '';
    siteUrl.value = ''
}

function deleteBookmark(itemIndex) {
    allBookmark.splice(itemIndex, 1)

    localStorage.setItem('myBookmarks', JSON.stringify(allBookmark))

    displayBookmark(allBookmark)
}

function bookmarkNameValidation() {
    var regex = /^[A-Z][a-z]{3,15}$/
    if (regex.test(siteName.value) == true) {
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        return true
    }
    else {
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        return false
    }
}

function bookmarkUrlValidation() {
    var urlRegex = /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

    if (urlRegex.test(siteUrl.value) == true) {
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        return true
    }
    else {
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        return false
    }
}

function clearValidation() {
    siteName.classList.remove('is-valid', 'is-invalid')
    siteUrl.classList.remove('is-valid', 'is-invalid')
}

function searchBookmark(term) {
    var searchArray = []

    for(var i = 0 ; i< allBookmark.length ; i++){
        if (allBookmark[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchArray.push(allBookmark[i])
        }
    }

    displayBookmark(searchArray)
}