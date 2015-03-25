$(document).ready(function() {
    var $alert = $('.alert');
    $alert.hide();
    $alert.on('error', function(event, data) {
        $alert.html(data)
        $alert.addClass('alert-danger');
        $alert.show();
        setTimeout(function() {
            $alert.hide();
        }, 5000);
    });
    $alert.on('success', function(event, data) {
        $alert.html(data);
        $alert.addClass('alert-info');
        $alert.show();
        setTimeout(function() {
            $alert.hide();
        }, 5000);
    })
    $('.delete').click(function(event) {
        $target = $(event.currentTarget);
        $.ajax({
            type: 'DELETE',
            url: '/api/reviews/' + $target.attr('data-reviews-id'),
            success: function(response) {
                $target.parent().parent().remove();
                $alert.trigger('success', 'Avis supprimer');
            },
            error: function(error) {
                $alert.trigger('error', error);
            }
        })
    });
    $('#valider').click(function(event) {
        var search = $("#search").val();
        var type = $("#type").val();
        location.replace("/search?" + type + "=" + search);
    });
});