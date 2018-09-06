/******************************************

Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
$(document).ready(function () { //wait for documanet to be ready
    //-------------------------PAGINATION CONTENT OPEN---------------------------//
    // Add variables that store DOM elements you will need to reference and/or manipulate
    const $fullList = $('li.student-item'); //array containtin each li representing a student
    const $page = $('div.page');

    //creating the div for PAGINATION
    const paginationDiv = document.createElement('div.pagination');
    $($page).append(paginationDiv);

    // Create a function to hide all of the items in the list excpet for the ten you want to show
    // Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
    function showPage(list, page){
        for(var i = 0; i <= list.length; i+= 1){
            let currentStudent = list[i];
            let studentMin = page * 10;
            let studentMax = studentMin + 9;

            // Arrays for jQuery targets
            let showList = [];
            let hideList = [];

            if(i >= studentMin && i <= studentMax){
                showList.push(currentStudent);
            }else{
                hideList.push(currentStudent);
            }

            // adding hide to the old students and fading in the new students
            $(hideList).hide();
            $(showList).fadeIn();
        }
    }



    // Create and append the pagination links - Creating a function that can do this is a good approach
    function appendPageLinks(list) {
        const pagesNeeded = Math.ceil(list.length / 10); //rounds to the highest integer

        //conditional to remove any pagination already in place
        if($(paginationDiv).children()){
            $(paginationDiv).empty();
        }

        // create the new div for pagination
        let newPagiDiv = document.createElement('div');
        $(newPagiDiv).addClass('pagination');

        //append the new div for pagination
        $page.append(newPagiDiv);

        // adding content to the pagination div
        let pagiUl = document.createElement('ul');
        newPagiDiv.append(pagiUl);

        for(i = 1; i <= pagesNeeded; ++i){
            //creating links for pagination
            let pagiLi = document.createElement('li');
            let pagiA = document.createElement('a');
            $(pagiLi).addClass('pagination');
            $(pagiA).addClass('pagination');

            // appending the links to the document
            $(newPagiDiv).append(pagiLi);
            $(pagiLi).append(pagiA);

            //adding the page number to the pagination link
            pagiA.append([i]);

            if(i === 1){
                $(pagiA).addClass('active');
            }


            //adding event listeners to each anchor
            $('a.pagination').click((event) => {
                let activeLink = event.target;
                let currentPage = (parseInt(event.target.textContent, 10) - 1);

                // removing teh active class from the previous anchor
                $('a.pagination').removeClass('active');

                // adding active to the current anchor
                $(activeLink).addClass('active');

                // Add functionality to the pagination buttons so that they show and hide the correct items
                // Tip: If you created a function above to show/hide list items, it could be helpful here
                showPage($fullList, currentPage);

            });
        }

        // initializing the pagination
        showPage($fullList, 0);
    }

    //------------------------PAGINATION CONTENT CLOSE---------------------------//

    //------------------------SEARCH CONTENT OPEN--------------------------------//
    //adding elements for the search bar
    let searchBar = document.createElement('div.student-search');
    let searchField = document.createElement('input');
    $(searchField).attr('placeholder', 'Search for students...');
    let searchButton = document.createElement('button');
    $(searchButton).append('Search');

    $('div.page-header').append(searchBar);
    $(searchBar).append(searchField);
    $(searchBar).append(searchButton);

    // Variables for search functionality
    let $filter = $(searchField).val().toLowerCase();
    let $names = $($fullList).children('h3');

    $(searchBar).on('keyup', (event) => {
        for (var i = 0; i < $names.length; i++) {
            let currentName = $names[i];
            if ($(currentName + ':contains('+$filter+')')) {
                $(currentName).show();
            }else{
                $(currentName).hide();
            };
        };
        // appendPageLinks($fullList);
    });
    //--------------------SEARCH CONTENT CLOSE-------------------------------//
    //begins the pagination function stack
    appendPageLinks($fullList);
});
