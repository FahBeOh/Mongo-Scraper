$("#scrapeBtn").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .done(function (data){
        // $(".modal").modal('toggle');
        console.log(data);
        window.location = "/"
    })
    // .then(
    //     $.ajax({
    //         method: "GET",
    //         url: "/articles"
    //     })
    //     .then(function (data){
    //         console.log(data)
    //     }
    // ))
});
