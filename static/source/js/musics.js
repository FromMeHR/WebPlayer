
document.getElementById("search-songs").addEventListener("click", function() {
    document.querySelector("input[name='search_type']").value = "songs";
    document.getElementById("search-submit").click();
})

document.getElementById("search-albums").addEventListener("click", function() {
    document.querySelector("input[name='search_type']").value = "albums";
    document.getElementById("search-submit").click();
})
