function deleteReview(reviewId) {
    var reviewRow = document.getElementById(reviewId);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(reviewId) {
        if(httpRequest.readyState === 4 && httpRequest.status === 204) {
            reviewRow.remove();
        }
    }
    httpRequest.open('DELETE', '/reviews/' + reviewId, true);
    httpRequest.send();
}

function showEditForm(show) {
    document.getElementById('content').style.display = (show) ? 'none' : 'block';
    document.getElementById('edit').style.display = (show) ? 'block' : 'none';
    document.getElementById('error').innerHTML = '';
    document.getElementById('success').innerHTML = '';
}

function updateReview(reviewId) {
    var newReview = {
        name: document.getElementById('name').value,
        placeType: document.getElementById('placeType').value,
        stars: Number.parseInt(document.getElementById('stars').value)
    };

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(reviewId) {
         if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                document.getElementById('success').innerHTML = 'Review Updated!';

                // Little trick to override showEditForm function to force reload when click on Close
                window.showEditForm = function(show) {
                    window.location.reload();
                }
            } else {
                document.getElementById('error').innerHTML = 'Error';
            }
         } else {
            document.getElementById('success').innerHTML = 'Saving...';
         }
    }
    httpRequest.open('PUT', '/reviews/' + reviewId, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(newReview));
}