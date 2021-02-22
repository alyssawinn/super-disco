//Add Current Date to Header
var curDate = moment().format('dddd, MMMM Do');
$('#currentDay').append(curDate);

schedule = [];

/*
STEPS
1. Load localstorage into corresponding textboxes
- How do we know what the corresponding textboxes are? Based off data-id?
2. Change background color of textarea based on time of day (gray for passed, red for current, and green for future) and setinterval to update every hour
3. If text is changed in textarea AND corresponding save button is clicked, then update array
- If text is changed in textarea BUT corresponding save button is NOT clicked, do nothing

1. Figure out how to align the button with the textarea
*/

var createSchedule = function(id, text) {
    console.log('id: ' + id + ' | text: ' + text);
}

var loadSchedule = function() {
    schedule = JSON.parse(localStorage.getItem("schedule"));

    if (!schedule) {
        schedule = [
            {id: 0, text: ""},
            {id: 1, text: ""},
            {id: 2, text: ""},
            {id: 3, text: ""},
            {id: 4, text: ""},
            {id: 5, text: ""},
            {id: 6, text: ""},
            {id: 7, text: ""}
        ];
    }

    $.each(schedule, function(key, value) {
        createSchedule(value.id, value.text);
    });
}

var saveSchedule = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

$('.saveBtn').click(function() {
    var updatedText = $(this).closest('.row').find('textarea').val();
    var index = $(this).closest('.row').find('textarea').data().id;
    console.log(updatedText + " , " + index);
    schedule[index].text = updatedText;
})

loadSchedule();

