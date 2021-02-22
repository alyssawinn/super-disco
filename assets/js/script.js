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
*/

var createSchedule = function(id, text) {
    var boxToUpdate = $(`textarea[data-id=${id}]`).data().id;
    if (id === boxToUpdate) {
        $(`textarea[data-id=${id}]`).val(text);
    }
    saveSchedule();
}

var loadSchedule = function() {
    schedule = JSON.parse(localStorage.getItem("schedule"));

    if (!schedule) {
        schedule = [
            {id: 0, text: "hello"},
            {id: 1, text: ""},
            {id: 2, text: ""},
            {id: 3, text: ""},
            {id: 4, text: ""},
            {id: 5, text: ""},
            {id: 6, text: ""},
            {id: 7, text: ""},
            {id: 8, text: ""}
        ];
    }

    $.each(schedule, function(key, value) {
        createSchedule(value.id, value.text);
    });
}

var saveSchedule = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

var changeColor = function(timeEl) {
    $(timeEl).removeClass("past present future");
    var startTime = moment("9AM", "hA");
    var endTime = moment("5PM", "hA");
    var blockHourText = $(timeEl).find("p").text().trim();
    var blockHour = moment(blockHourText, "hA");
    if (moment().isSame(blockHour)) {
        $(timeEl).find("textarea").addClass("present");
    } else if (moment().isAfter(blockHour) && moment().isBefore(endTime) && moment().isAfter(startTime)) {
        $(timeEl).find("textarea").addClass("future");
    } else if (moment().isBefore(blockHour) && moment().isAfter(startTime) && moment().isBefore(endTime)) {
        $(timeEl).find("textarea").addClass("past");
    }
}

$('.saveBtn').click(function() {
    var updatedText = $(this).closest('.row').find('textarea').val();
    var index = $(this).closest('.row').find('textarea').data().id;
    schedule[index].text = updatedText;
    createSchedule(index, updatedText);
})

loadSchedule();

setInterval(function() {
    $(".row").each(function(index, el) {
        changeColor(el);
    });
}, 1000);


