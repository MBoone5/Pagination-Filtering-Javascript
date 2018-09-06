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
        for(let i = 0; i <= list.length; i++){
            let currentStudent = list[i];
            let studentMin = ((page * 10) - 10);
            let studentMax = ((page * 10) - 1);

            if(i >= studentMin && i <= studentMax){
                $(currentStudent).show();
            }else{
                $(currentStudent).hide();
            }
        }
    }



    // Create and append the pagination links - Creating a function that can do this is a good approach
    function appendPageLinks(list) {
        const pagesNeeded = Math.ceil(list.length / 10); //rounds to the highest integer

        //conditional to remove any pagination already in place
        if($(paginationDiv).children()){
            $(paginationDiv).remove();
        }

        // create the new div for pagination
        let $newPagiDiv = $('<div></div>').addClass('pagination');

        //append the new div for pagination
        $page.append($newPagiDiv);

        // adding content to the pagination div
        let $pagiUl = $('<ul></ul>');
        $newPagiDiv.append($pagiUl);

        for(i = 1; i <= pagesNeeded; ++i){
            //creating links for pagination
            let $pagiLi = $('<li></li>').addClass('pagination');
            let $pagiA = $('<a></a>').addClass('pagination');

            // appending the links to the document
            $($newPagiDiv).append($pagiLi);
            $($pagiLi).append($pagiA);

            //adding the page number to the pagination link
            $pagiA.append([i]);

            if(i === 1){
                $($pagiA).addClass('active');
            }


            //adding event listeners to each anchor
            $('a.pagination').click((event) => {
                let activeLink = event.target;
                let currentPage = event.target.textContent;

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
        showPage($fullList, 1);
    }

    //------------------------PAGINATION CONTENT CLOSE---------------------------//

    //------------------------SEARCH CONTENT OPEN--------------------------------//
    //adding elements for the search bar
    let $searchBar = $('<div></div>').addClass('student-search');
    let $searchField = $('<input>').attr('placeholder', 'Search for students...');
    let $searchButton = $('<button></button>').text('Search');

    $('div.page-header').append($searchBar);
    $($searchBar).append($searchField);
    $($searchBar).append($searchButton);

    // modified pagination function for paginating search results
    function searchPageLinks(filteredStudents) {
        const pagesNeeded = Math.ceil(filteredStudents / 10); //rounds to the highest integer
        //conditional to remove any pagination already in place
        if($(paginationDiv).children()){
            $(paginationDiv).remove();
        }

        // create the new div for pagination
        let $newPagiDiv = $('<div></div>').addClass('pagination');

        //append the new div for pagination
        $page.append($newPagiDiv);

        // adding content to the pagination div
        let $pagiUl = $('<ul></ul>');
        $newPagiDiv.append($pagiUl);

        for(i = 1; i <= pagesNeeded; ++i){
            //creating links for pagination
            let $pagiLi = $('<li></li>').addClass('pagination');
            let $pagiA = $('<a></a>').addClass('pagination');

            // appending the links to the document
            $($newPagiDiv).append($pagiLi);
            $($pagiLi).append($pagiA);

            //adding the page number to the pagination link
            $pagiA.append([i]);

            if(i === 1){
                $($pagiA).addClass('active');
            }


            //adding event listeners to each anchor
            $('a.pagination').click((event) => {
                let activeLink = event.target;
                let currentPage = event.target.textContent;

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
        showPage($fullList, 1);
    }

    // targeting h3 name elements
    $('li.student-item h3').addClass('student-name');

    $($searchBar).on('keyup', () => {
        for (let i = 0; i < $fullList.length; i++) {
            let $filter = $($searchField).val().toLowerCase();

            $('h3.student-name:not(:contains('+ $filter +'))').parentsUntil('ul').hide()
            $('h3.student-name:contains('+ $filter +')').parentsUntil('ul').addClass().show()
        };
        // appendPageLinks($fullList);
    });
    //--------------------SEARCH CONTENT CLOSE-------------------------------//
    //begins the pagination function stack
    appendPageLinks($fullList);
});
