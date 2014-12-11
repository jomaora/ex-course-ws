function deleteReview(reviewId) {
    var reviewRow = document.getElementById(reviewId);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(reviewId) {
        console.log(httpRequest);
        if(httpRequest.readyState == 4 && httpRequest.status == 204) {
            reviewRow.remove();
        }
    }
    httpRequest.open('DELETE', '/reviews/' + reviewId, true);
    httpRequest.send();
}

function updateReview(reviewId) {
    var reviewRow = document.getElementById(reviewId);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(reviewId) {
        console.log(httpRequest);
        if(httpRequest.readyState == 4 && httpRequest.status == 204) {
            reviewRow.remove();
        }
    }
    httpRequest.open('DELETE', '/reviews/' + reviewId, true);
    httpRequest.send();
}