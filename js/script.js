/******************************************

Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
$(document).ready(function () { //wait for documanet to be ready
    //-------------------------PAGINATION CONTENT OPEN---------------------------//
    // Add variables that store DOM elements you will need to reference and/or manipulate
    const $fullList = $('li.student-item'); //array containtin each li representing a student
    const $page = $('div.page');

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
        if($('div.pagination')) {
            $('div.pagination').empty();
            $('div.pagination').remove();
        }

        // create the new div for pagination
        let $pagiDiv = $('<div></div>').addClass('pagination');

        //append the new div for pagination
        $page.append($pagiDiv);

        // adding content to the pagination div
        let $pagiUl = $('<ul></ul>');
        $pagiDiv.append($pagiUl);

        for(i = 1; i <= pagesNeeded; ++i){
            //creating links for pagination
            let $pagiLi = $('<li></li>').addClass('pagination');
            let $pagiA = $('<a></a>').addClass('pagination');

            // appending the links to the document
            $($pagiUl).append($pagiLi);
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
                showPage(list, currentPage);

            });
        }

        // initializing the pagination
        showPage(list, 1);
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

    $($searchBar).keyup(() => {
        let studentsFiltered = [];
        for (let i = 0; i < $fullList.length; i++) {
            let $filter = $($searchField).val().toLowerCase();

            // find which h3 elements do and do not contain the search input
            let $containsFilter = $('li:contains('+ $filter +')');
            let $notContainsFilter = $('li:not(:contains('+ $filter +'))');

            // hide li's that do not contain the filter
            $($notContainsFilter).hide();

            // show li's that do contain the filter
            $($containsFilter).show();

            // Declare the filtered students as the value of the studentsFiltered array
            console.log($containsFilter);
            studentsFiltered.push($containsFilter)
        };
        //make an array of all the students currently showing
        //paginate students in that array
        // appendPageLinks(studentsFiltered);
    });
    //--------------------SEARCH CONTENT CLOSE-------------------------------//

    //begins the pagination function stack
    appendPageLinks($fullList);
});
