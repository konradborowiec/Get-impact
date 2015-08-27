$(document).ready(function(){

    var booksDiv = $("#book_list");
    var getBooks = function() {
        booksDiv.empty();

        $.ajax({
            url: "http://api.coderslab.pl/book",
            method: "GET",
            success: function (json) {
                console.log("Udało się");

                for (var i = 0; i < json.length; i++) {
                    var book = $("<div class='book'> data-id='" + json[i].id + "");
                    $("<h1>").text(json[i].name).appendTo(book);
                    $("<h3>").text(json[i].autor).appendTo(book);
                    $("<p>").text(json[i].description).appendTo(book);
                    $('<a class="btn_deleteX">X</a>').appendTo(book);
                    book.appendTo(booksDiv);
                }
            },
            error: function (xhr, status, error) {
                console.log("Błąd");
                console.log(xhr);
            },
            complete: function (xhr, status) {
                console.log("koniec");
            }
        });
    };

    getBooks();



    $('#button').on('click', function() {

        event.preventDefault();

        var title = $('#book_name').val();
        var autor = $('#autor_name').val();
        var desc = $('#description_name').val();


        console.log(title);
        console.log(autor);
        console.log(desc);

        var nowa_ksiazka = {
            name: title,
            autor: autor,
            description: desc
        };

        nowa_ksiazka = JSON.stringify(nowa_ksiazka);
        console.log(nowa_ksiazka);

        $.ajax({
            url: "http://api.coderslab.pl/book",
            method: "POST",
            data: nowa_ksiazka,

            success: function(json) {
                console.log("Udało się - DODANIE NOWEJ KSIAZKI");
                getBooks();
            },
            error: function(xhr, status, error){
                console.log("Błąd DODANIE NOWEJ KSIAZKI");
                console.log(xhr);
            },
            complete: function(xhr, status) {
                console.log("koniec");
            }
        });
    });
    var btnClear = $('.btn_deleteX');

    btnClear.on('click', function() {
        console.log("x dziala");
        $.ajax({
                url: "http://api.coderslab.pl/book",
                method: "DELETE",
                data: nowa_ksiazka,

                success: function(json) {
                    console.log("Udało się - KASOWANIE KSIAZKI");
                },
                error: function(xhr, status, error){
                    console.log("Błąd KASOWANIE KSIAZKI");
                    console.log(xhr);
                },
                complete: function(xhr, status) {
                    console.log("koniec SKASOWANIE KSIAZKI");
                }

            });
    });
});
